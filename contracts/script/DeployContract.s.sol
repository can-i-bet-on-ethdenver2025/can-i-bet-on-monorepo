// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/BettingPools.sol";

// Script to deploy and seed the application contract with data
// Deploy application contract, launch 5 pools, place bets on them across 3 accounts
contract DemoPoolsScript is Script {
  function run() external {
    // Warp to current block timestamp
    vm.warp(block.timestamp);

    // Load private keys from environment variables
    uint256 deployerKey = vm.envUint("MAIN_PRIVATE_KEY");
    address deployer = vm.addr(deployerKey);

    vm.startBroadcast(deployer);

    new BettingPools(
      address(0xf9B8fc078197181C841c296C876945aaa425B278),
      address(0x036CbD53842c5426634e7929541eC2318f3dCF7e)
    );

    vm.stopBroadcast();
  }
}
    
    