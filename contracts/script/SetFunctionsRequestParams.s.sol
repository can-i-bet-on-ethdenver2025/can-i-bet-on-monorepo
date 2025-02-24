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
          bytes(
            "0x7bbed2fe8ed50dd44ab25187c03830ba02413af27fcbd0d0fb8b0b1337b8c0ae84d1560a574c46cb2195a7c4ddd6ea1ad22ba80d56139705483c09cf203a73e4d34b1208cb2d1b506cd1d57b87a161de8aa72c975aaef37f34c84f1e94033c0aea08375312e37fe7a1e7a3e3567d3256f2524557a62853723e62c82c734e58a9802874ac3b0f847b5f954bacbe51cbb1158c1aa9f238cebdbcef0ad1902fdd00ad"
          )
        );

        vm.stopBroadcast();
    }
}
