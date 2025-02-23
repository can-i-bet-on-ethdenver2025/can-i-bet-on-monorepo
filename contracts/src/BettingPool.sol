// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC20Permit} from "openzeppelin-contracts/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {EIP712} from "openzeppelin-contracts/contracts/utils/cryptography/EIP712.sol";
import {ERC20} from "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";
import {ECDSA} from "openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol";

contract BettingPools is EIP712, Ownable {
  // Enums
  enum PoolStatus {
    NONE,
    PENDING,
    GRADED,
    REGRADED //Disputed (unused for now)
  }

  // Structs
  struct Pool {
    uint256 id; // Incremental id
    string question; // Bet question
    string[2] options; // Bet options
    uint40 betsCloseAt; // Time at which no more bets can be placed
    uint40 decisionDate; // UNUSED
    uint256[2] betTotals; // Total amount of money bet on each option
    uint256[] betIds; // Array of ids for user bets
    mapping(address => Bet[2]) betsByUser; // Mapping from user address to their bets. Bets for option
    uint256 winningOption; // Option that won the bet (0 or 1) (only matters if status is GRADED)
    PoolStatus status; // Status of the bet
    bool isDraw; // Indicates if the bet is a push (no winner and betters are refunded)
    uint256 createdAt; // Time at which the bet was created
    string imageUrl; // UNUSED
    string category; // UNUSED
    string creatorName; // Username of Telegram user who created the bet
    string creatorId; // Telegram id of user who created the bet
    string closureCriteria; // Criteria for WHEN a bet should be graded
    string closureInstructions; // Instructions for HOW to decide which option won
  }

  struct Signature {
    uint8 v;
    bytes32 r;
    bytes32 s;
  }

  struct Bet {
    uint256 id; // Incremental id
    address owner; // Address of user who made the bet
    uint256 option; // Option that the user bet on (0 or 1)
    uint256 amount; // Amount of USDC bet
    uint256 poolId; // Id of the pool the bet belongs to
    uint256 createdAt; // Time at which the bet was initially created
    uint256 updatedAt; // Time which bet was updated (ie: if a user added more money to their bet)
  }

  bytes32 public constant BET_TYPEHASH = keccak256(
    "Bet(uint256 poolId,uint256 optionIndex,uint256 amount,address bettor)"
  );

  uint256 public constant PAYOUT_FEE_BP = 90; // 0.9% fee for the payout

  // State
  ERC20Permit usdc;

  uint256 public nextPoolId = 1;
  uint256 public nextBetId = 1;

  mapping(uint256 => Pool) public pools;

  mapping(uint256 => Bet) public bets;
  mapping(address => uint256[]) public userBets;

  // Functions Config
  uint64 public subscriptionId;
  bytes32 public donId;
  uint24 public callbackGasLimit;
  bytes public encryptedSecretsReference;
  string public script;

  // Custom Errors
  error BetsCloseTimeInPast();
  error BetsCloseAfterDecision();
  error PoolNotOpen();
  error BettingPeriodClosed();
  error InvalidOptionIndex();
  error BetAlreadyExists();
  error USDCTransferFailed();
  error NoBetToCancel();
  error USDCRefundFailed();
  error DecisionDateNotReached();
  error PoolAlreadyClosed();

  // Events
  event PoolCreated(
    uint256 indexed poolId,
    string question,
    string[2] options,
    uint40 betsCloseAt,
    uint40 decisionDate,
    string imageUrl,
    string category,
    string creatorName,
    string creatorId,
    string closureCriteria,
    string closureInstructions
  );
  event PoolClosed(uint256 indexed poolId, uint256 selectedOption);
  event BetPlaced(
      uint256 indexed betId, uint256 indexed poolId, address indexed user, uint256 optionIndex, uint256 amount
  );

  constructor(address _usdc) EIP712("PromptBet", "0.0.1") Ownable(msg.sender) {
    usdc = ERC20Permit(_usdc);
  }

  function createPool(
    string calldata question,
    string[2] calldata options,
    uint40 betsCloseAt, // Time at which no more bets can be placed
    uint40 decisionDate, // UNUSED (You can pass 1771898245 which is 1 year in the future)
    string calldata imageUrl, // UNUSED (pass empty string "")
    string calldata category, // UNUSED (pass empty string "")
    string calldata creatorName, // Telegram username of creator
    string calldata creatorId, // Telegram id of creator
    string calldata closureCriteria, // Criteria for WHEN a bet should be graded
    string calldata closureInstructions // Instructions for HOW to decide which option won
  ) external returns (uint256 poolId) {
    if (betsCloseAt <= block.timestamp) revert BetsCloseTimeInPast();
    if (betsCloseAt >= decisionDate) revert BetsCloseAfterDecision();

    poolId = nextPoolId++;
    
    Pool storage pool = pools[poolId];
    pool.id = poolId;
    pool.question = question;
    pool.options = options;
    pool.betsCloseAt = betsCloseAt;
    pool.decisionDate = decisionDate;
    pool.betTotals = [0, 0];
    pool.betIds = new uint256[](0);
    pool.winningOption = 0;
    pool.status = PoolStatus.PENDING;
    pool.isDraw = false;
    pool.createdAt = block.timestamp;
    pool.imageUrl = imageUrl;
    pool.category = category;
    pool.creatorName = creatorName;
    pool.creatorId = creatorId;
    pool.closureCriteria = closureCriteria;
    pool.closureInstructions = closureInstructions;

    emit PoolCreated(
      poolId,
      question,
      options,
      betsCloseAt,
      decisionDate,
      imageUrl,
      category,
      creatorName,
      creatorId,
      closureCriteria,
      closureInstructions
    );

    return poolId;
  }

  function placeBet(
    uint256 poolId,
    uint256 optionIndex,
    uint256 amount,
    address bettor,
    uint256 usdcPermitDeadline,
    Signature calldata permitSignature,
    Signature calldata betSignature
  ) external returns (uint256 betId) {
    Pool storage pool = pools[poolId];

    require(block.timestamp <= pool.betsCloseAt, "Betting period has closed");
    require(pool.status == PoolStatus.PENDING, "Pool is not open for betting");
    require(optionIndex < 2, "Invalid option index");
    require(amount > 0, "Amount must be greater than 0");
    require(usdc.balanceOf(bettor) >= amount, "Bettor does not have enough USDC");

    usdc.permit(
      bettor,
      address(this),
      amount,
      usdcPermitDeadline,
      permitSignature.v,
      permitSignature.r,
      permitSignature.s
    );
    usdc.transferFrom(bettor, address(this), amount);

    bytes32 offerStructHash = keccak256(
      abi.encode(
        BET_TYPEHASH,
        poolId,
        optionIndex,
        amount,
        bettor
      )
    );
    bytes32 offerHash = _hashTypedDataV4(offerStructHash);
    address recoveredBettorAddress = ECDSA.recover(offerHash, betSignature.v, betSignature.r, betSignature.s);
    require(bettor == recoveredBettorAddress, "Invalid bet signature");

    betId = pool.betsByUser[bettor][optionIndex].id;
    if (betId == 0) { // User has not bet on this option before
      betId = nextBetId++;
      Bet memory newBet = Bet({
        id: betId,
        owner: bettor,
        option: optionIndex,
        amount: amount,
        poolId: poolId,
        createdAt: block.timestamp,
        updatedAt: block.timestamp
      });
      bets[betId] = newBet;
      pool.betIds.push(betId);
      userBets[bettor].push(betId);
    } else {
      pool.betsByUser[bettor][optionIndex].amount += amount;
      pool.betsByUser[bettor][optionIndex].updatedAt = block.timestamp;
    }
    pool.betTotals[optionIndex] += amount;

    emit BetPlaced(betId, poolId, bettor, optionIndex, amount);

    return betId;
  }

  // POSSIBLE FUTURE EXTENSION: Anyone can call this function to grade a bet at any time, but
  // it costs 0.01 ETH to cover the costs of grading the bet to cover the costs of the Functions request to grade
  // (That way the contract only cannot withhold grading the bet)
  function gradeBet(uint256 poolId) external onlyOwner {
    Pool storage pool = pools[poolId];

    require(pool.status == PoolStatus.PENDING, "Pool is not open for betting");
    require(block.timestamp >= pool.betsCloseAt, "Betting period has not closed yet");

  }

  function setFunctionsRequestConfig(
    uint64 subscriptionId,
    bytes32 donId,
    uint24 callbackGasLimit,
    bytes calldata encryptedSecretsReference
  ) external onlyOwner {

  }

  function setFunctionsRequestScript(string calldata script) external onlyOwner {

  }

  // Functions needs to return 0,1,2,3 for the 4 possible outcomes
  // (0 = option 1 wins, 1 = option 2 wins, 2 = push, 3 = unable to grade yet)
  function sendFunctionsRequest(uint256 poolId) internal {
  }
    
//     if (pool.status != PoolStatus.PENDING) revert PoolNotOpen();
//     if (block.timestamp >= pool.betsCloseAt) revert BettingPeriodClosed();
//     if (optionIndex >= 2) revert InvalidOptionIndex();

//     Bet[2] storage userBetsArray = pool.betsByUser[msg.sender];
//     if (userBetsArray[optionIndex].amount != 0) revert BetAlreadyExists();

//     if (!usdcToken.transferFrom(msg.sender, address(this), amount)) {
//         revert USDCTransferFailed();
//     }

//     uint256 betId = nextBetId++;
//     Bet memory newBet = Bet({id: betId, owner: msg.sender, option: optionIndex, amount: amount, poolId: poolId});
//     bets[betId] = newBet;
//     pool.betIds.push(betId);
//     userBetsArray[optionIndex] = newBet;
//     pool.betTotals[optionIndex] += amount;
//     userBets[msg.sender].push(betId);

//     emit BetPlaced(betId, poolId, msg.sender, optionIndex, amount);
// }
}