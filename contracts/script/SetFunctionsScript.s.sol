// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/BettingPools.sol";

contract SetFunctionsScript is Script {
    function run() external {
        // Get deployer's private key from environment
        uint256 deployerKey = vm.envUint("MAIN_PRIVATE_KEY");
        address deployer = vm.addr(deployerKey);

        vm.startBroadcast(deployer);

        // Attach to the BettingPools contract
        BettingPools bettingPools = BettingPools(vm.envAddress("BETTING_POOLS_ADDRESS"));

        // Set the request script
        bettingPools.setFunctionsRequestScript("return Functions.encodeUint256(1);");

        vm.stopBroadcast();
    }
}
