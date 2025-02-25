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
        // Print the bettor's address
        console.log("Bettor address:", bettor);

        // Get contract addresses from environment variables
        address bettingPoolsAddress = vm.envAddress("BETTING_POOLS_ADDRESS");
        address mockUsdcAddress = vm.envAddress("MOCK_USDC_ADDRESS");
        MockUSDC usdc = MockUSDC(mockUsdcAddress);
        BettingPools bettingPools = BettingPools(bettingPoolsAddress);

        // Input pool parameters
        uint256 poolId = 7;
        uint256 optionIndex = 1;
        uint256 amount = 3 * 10 ** usdc.decimals();

        // USDC PERMIT SIGNATURE

        // INPUT: User provides: 1. their address (ie: bettor) 2. USDC amount (use 6 decimals)
        // BACKEND: We fetch: 1. their nonce 2. permit typehash
        // BACKEND: We generate: 1. deadline (Date.now() + 1 hour in seconds (not milliseconds))
        // BACKEND: We calculate: 1. permit struct hash
        // BACKEND: We sign: 1. permit struct hash
        // OUTPUT: We respond with: 1. permitDigest
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

        // USER: signs permitDigest
        uint8 vPermit;
        bytes32 rPermit;
        bytes32 sPermit;
        (vPermit, rPermit, sPermit) = vm.sign(bettorPrivateKey, permitDigest);

        vm.startBroadcast(bettorPrivateKey);

        // INPUT:1. poolId 2. optionIndex 3. amount 4. bettor 5. deadline (note user must provide the deadline they signed the permit with) 6. permitSignature
        // BACKEND: We call placeBet
        bettingPools.placeBet(
            poolId,
            optionIndex,
            amount,
            bettor,
            deadline,
            BettingPools.Signature({v: vPermit, r: rPermit, s: sPermit})
        );

        vm.stopBroadcast();
    }
}
