// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC20Permit} from "./lib/openzeppelin-contracts/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {EIP712} from "./lib/openzeppelin-contracts/contracts/utils/cryptography/EIP712.sol";
import {ERC20} from "./lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "./lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import {ECDSA} from "./lib/openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol";
import {FunctionsClient} from "./lib/chainlink/contracts/src/v0.8/functions/v1_3_0/FunctionsClient.sol";
import {FunctionsRequest} from "./lib/chainlink/contracts/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol";
import {AutomationCompatibleInterface} from "./lib/chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";

contract BettingPools is EIP712, Ownable, FunctionsClient, AutomationCompatibleInterface {
  using FunctionsRequest for FunctionsRequest.Request;

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
    bool isPayedOut; // Whether the bet has been paid out by Chainlink Automation
  }

  bytes32 public constant BET_TYPEHASH = keccak256(
    "Bet(uint256 poolId,uint256 optionIndex,uint256 amount,address bettor)"
  );

  uint256 public constant PAYOUT_FEE_BP = 90; // 0.9% fee for the payout

  // State
  ERC20Permit usdc;

  uint256 public nextPoolId = 1;
  uint256 public nextBetId = 1;

  mapping(uint256 poolId => Pool pool) public pools;

  mapping(uint256 betId => Bet bet) public bets;
  mapping(address bettor => uint256[] betIds) public userBets;

  mapping(bytes32 functionsRequestId => uint256 poolId) public functionsRequestToPoolId;

  uint256[] bettingPoolsToPayOut; // Array of poolIds which need to be paid out after the bet is graded

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

  constructor(address _functionsRouter, address _usdc)
  EIP712("PromptBet", "0.0.1") Ownable(msg.sender) FunctionsClient(_functionsRouter) {
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
        updatedAt: block.timestamp,
        isPayedOut: false
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
  }

  // POSSIBLE FUTURE EXTENSION: Anyone can call this function to grade a bet at any time, but
  // it costs 0.01 ETH to cover the costs of grading the bet to cover the costs of the Functions request to grade
  // (That way the contract only cannot withhold grading the bet)
  function gradeBet(uint256 poolId) external onlyOwner {
    Pool storage pool = pools[poolId];

    require(pool.status == PoolStatus.PENDING, "Pool is not open for betting");
    require(block.timestamp >= pool.betsCloseAt, "Betting period has not closed yet");

    FunctionsRequest.Request memory req;
    req.initializeRequest(
        FunctionsRequest.Location.Inline,
        FunctionsRequest.CodeLanguage.JavaScript,
        script
    );
    req.secretsLocation = FunctionsRequest.Location.Remote;
    req.encryptedSecretsReference = encryptedSecretsReference;

    bytes[] memory bytesArgs = new bytes[](6);
    bytesArgs[0] = abi.encodePacked(pool.id);
    bytesArgs[1] = abi.encodePacked(pool.betsCloseAt);
    bytesArgs[2] = abi.encodePacked(pool.decisionDate);
    bytesArgs[3] = abi.encodePacked(pool.betTotals[0]);
    bytesArgs[4] = abi.encodePacked(pool.betTotals[1]);
    bytesArgs[5] = abi.encodePacked(pool.createdAt);
    req.setBytesArgs(bytesArgs);

    string[] memory args = new string[](5);
    args[0] = pool.question;
    args[1] = pool.options[0];
    args[2] = pool.options[1];
    args[3] = pool.closureCriteria;
    args[4] = pool.closureInstructions;
    req.setArgs(args);

    bytes32 requestId = _sendRequest(
      req.encodeCBOR(),
      subscriptionId,
      callbackGasLimit,
      donId
    );

    functionsRequestToPoolId[requestId] = poolId;
  }

  function setFunctionsRequestConfig(
    uint64 _subscriptionId,
    bytes32 _donId,
    uint24 _callbackGasLimit
  ) external onlyOwner {
    subscriptionId = _subscriptionId;
    donId = _donId;
    callbackGasLimit = _callbackGasLimit;
  }

  function setFunctionsSecrets(bytes calldata _encryptedSecretsReference) external onlyOwner {
    encryptedSecretsReference = _encryptedSecretsReference;
  }

  // POSSIBLE FUTURE EXTENSION: Set some governance on how and when the script can changed.
  // Maybe take a snapshot of the script for each  pool so it cannot be changed after the pool is created?
  function setFunctionsRequestScript(string calldata _script) external onlyOwner {
    script = _script;
  }

  // Functions will return 0, 1, 2, or 3 for the 4 possible outcomes
  // (0 = option 1 wins, 1 = option 2 wins, 2 = push, 3 = unable to grade yet)
  function fulfillRequest(
    bytes32 requestId, bytes memory response, bytes memory err
  ) internal override {
    require(err.length == 0, "Error grading bet");

    uint256 poolId = functionsRequestToPoolId[requestId];
    Pool storage pool = pools[poolId];

    require(pool.status == PoolStatus.PENDING, "Invalid pool status");
    pool.status = PoolStatus.GRADED;

    uint256 responseOption = abi.decode(response, (uint256));

    if (responseOption == 0) {
      pool.winningOption = 0;
    } else if (responseOption == 1) {
      pool.winningOption = 1;
    } else if (responseOption == 2) {
        pool.isDraw = true;
    } else {
      revert("Bet cannot be graded");
    }

    bettingPoolsToPayOut.push(poolId);
  }

  // TODO: This implementation of using Chainlink Automation to "push" payouts will break
  // if there are too many pools or bets and the gas limit is exceeded.
  // In the future, we will need to implement a more efficient payout mechanism.
  // (Maybe a "pull" model?)

  function checkUpkeep(bytes calldata) external view override returns (bool upkeepNeeded, bytes memory performData) {
    upkeepNeeded = bettingPoolsToPayOut.length > 0;
    performData = abi.encode(bettingPoolsToPayOut[0]);
  }

  function performUpkeep(bytes calldata performData) external override {
    uint256 poolId = abi.decode(performData, (uint256));
    Pool storage pool = pools[poolId];

    require(pool.status == PoolStatus.GRADED, "Invalid pool status");
    require(block.timestamp >= pool.betsCloseAt, "Betting period has not closed yet");

    if (pool.isDraw) {
      // Refund all bets
      for (uint256 i = 0; i < pool.betIds.length; i++) {
        Bet storage bet = bets[pool.betIds[i]];
        usdc.transfer(bet.owner, bet.amount);
      }
    } else {
      // Payout the winning bet
      for (uint256 i = 0; i < pool.betIds.length; i++) {
        Bet storage bet = bets[pool.betIds[i]];
        if (bet.option == pool.winningOption) {
          uint256 fee = bet.amount * PAYOUT_FEE_BP / 10000;
          uint256 payout = bet.amount - fee;
          usdc.transfer(bet.owner, payout);
          usdc.transfer(owner(), fee);
          bets[pool.betIds[i]].isPayedOut = true;
        }
      }
    }

    // Remove the pool from the array of pools to pay out
    uint256 index = 0;
    for (uint256 i = 0; i < bettingPoolsToPayOut.length; i++) {
      if (bettingPoolsToPayOut[i] == poolId) {
        index = i;
      }
    }
    bettingPoolsToPayOut[index] = bettingPoolsToPayOut[bettingPoolsToPayOut.length - 1];
    bettingPoolsToPayOut.pop();
  }
}