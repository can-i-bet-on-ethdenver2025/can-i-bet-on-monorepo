// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/BettingPools.sol";

contract SetFunctionsRequestParams is Script {
    function run() external {
        // Get deployer's private key from environment
        uint256 deployerKey = vm.envUint("MAIN_PRIVATE_KEY");
        address deployer = vm.addr(deployerKey);

        vm.startBroadcast(deployer);

        // Attach to the BettingPools contract
        BettingPools bettingPools = BettingPools(vm.envAddress("BETTING_POOLS_ADDRESS"));

        // Set the Functions request configuration parameters
        bettingPools.setFunctionsRequestConfig(
            144,
            bytes32(0x66756e2d626173652d7365706f6c69612d310000000000000000000000000000),
            300000
        );

        // Set the encrypted secrets reference
        bettingPools.setFunctionsSecrets(
            hex"0397fddeff31f9dbf668f7e0ad26e499025ac4eb64645693dfb2413670728a323d3a8d02653ec4f34ac56ba5fd7ee39214b6384f2565abb3812312411560772df8ea95d4a8fff1ee4bd447579ee54617002d80c66bbec04cd181e28c69487db8a274ab97fff4c574cf3dd8465f4bb815cd15806a8e3bcedf27aa36a776a567efe5fb461be343f69617878ba0f297b7738e20817eb9e008bb60937e320681f5b7c3"
        );

        vm.stopBroadcast();
    }
}
