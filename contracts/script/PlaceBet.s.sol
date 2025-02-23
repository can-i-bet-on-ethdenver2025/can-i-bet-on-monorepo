// // SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.13;

// import {Script, console2} from "forge-std/Script.sol";
// import {BettingPools} from "../src/BettingPools.sol";
// import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// contract PlaceBetScript is Script {
//     // You can modify these values when running the script
//     address constant BETTING_POOLS_ADDRESS = address(0x883Fba984612A273DBaEcC79036Fb674709cAd39); // Replace with actual contract address
//     address constant USDC_ADDRESS = address(0x5f96C54c3ec8db595d61F0f37E7C03B3E57145b0); // Replace with actual USDC address
//     uint256 constant POOL_ID = 2; // Replace with actual pool ID
//     uint256 constant OPTION_INDEX = 1; // 0 or 1
//     uint256 constant BET_AMOUNT = 200e6; // 100 USDC (assuming 6 decimals)

//     function run() public {
//         // Get private key from environment
//         uint256 privateKey = vm.envUint("MAIN_PRIVATE_KEY");
//         address bettor = vm.addr(privateKey);

//         // Start broadcasting transactions
//         vm.startBroadcast(privateKey);

//         // Get contract instances
//         BettingPools bettingPools = BettingPools(BETTING_POOLS_ADDRESS);
//         IERC20 usdc = IERC20(USDC_ADDRESS);

//         // Approve USDC spending
//         usdc.approve(BETTING_POOLS_ADDRESS, BET_AMOUNT);

//         // Place the bet
//         bettingPools.placeBet(POOL_ID, OPTION_INDEX, BET_AMOUNT);

//         vm.stopBroadcast();

//         // Log the results
//         console2.log("Bet placed successfully!");
//         console2.log("Bettor:", bettor);
//         console2.log("Pool ID:", POOL_ID);
//         console2.log("Option:", OPTION_INDEX);
//         console2.log("Amount:", BET_AMOUNT);
//     }
// }
