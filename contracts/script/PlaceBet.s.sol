// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/BettingPools.sol";
import "../mocks/MockUSDC.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol";
import "@openzeppelin/contracts/interfaces/IERC5267.sol";

contract PlaceBetScript is Script {
    function run() external {
        // Load private key from environment variables
        uint256 bettorPrivateKey = vm.envUint("ACCOUNT1_PRIVATE_KEY");
        address bettor = vm.addr(bettorPrivateKey);

        // Get contract addresses from environment variables
        address bettingPoolsAddress = vm.envAddress("BETTING_POOLS_ADDRESS");
        address mockUsdcAddress = vm.envAddress("MOCK_USDC_ADDRESS");
        MockUSDC usdc = MockUSDC(mockUsdcAddress);
        BettingPools bettingPools = BettingPools(bettingPoolsAddress);

        // Input pool parameters
        uint256 poolId = 1;
        uint256 optionIndex = 1;
        uint256 amount = 1 * 10 ** usdc.decimals();

        // USDC PERMIT SIGNATURE

        uint256 nonce = usdc.nonces(bettor);
        uint256 deadline = block.timestamp + 1 hours;

        bytes32 permitStructHash = keccak256(abi.encode(
            usdc.PERMIT_TYPEHASH(),
            bettor,
            bettingPoolsAddress,
            amount,
            nonce,
            deadline
        ));
        bytes32 permitDigest = usdc.getHash(permitStructHash);

        uint8 vPermit;
        bytes32 rPermit;
        bytes32 sPermit;
        (vPermit, rPermit, sPermit) = vm.sign(bettorPrivateKey, permitDigest);

        // BET SIGNATURE

        bytes32 betStructHash = keccak256(abi.encode(
            bettingPools.BET_TYPEHASH(),
            poolId,
            optionIndex,
            amount,
            bettor
        ));
        bytes32 betDigest = bettingPools.getHash(betStructHash);

        uint8 vBet;
        bytes32 rBet;
        bytes32 sBet;
        (vBet, rBet, sBet) = vm.sign(bettorPrivateKey, betDigest);

        vm.startBroadcast(bettorPrivateKey);

        // Place the bet with both signatures
        bettingPools.placeBet(
            poolId,
            optionIndex,
            amount,
            bettor,
            deadline,
            BettingPools.Signature({v: vPermit, r: rPermit, s: sPermit}),
            BettingPools.Signature({v: vBet, r: rBet, s: sBet})
        );

        vm.stopBroadcast();
    }
}
