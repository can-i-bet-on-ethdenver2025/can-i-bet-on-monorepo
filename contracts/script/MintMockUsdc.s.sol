// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {MockUSDC} from "../mocks/MockUSDC.sol";

contract MintMockUsdcScript is Script {
    function run() public {
        // Load environment variables
        uint256 privateKey = vm.envUint("MAIN_PRIVATE_KEY");
        address mockUsdcAddress = vm.envAddress("MOCK_USDC_ADDRESS");
        
        // Hardcoded recipient address - replace with your desired address
        address recipient = 0xa7fF26f384a6e48613bd2917E5b6c40D69C1Fdd6;
        
        // Amount to mint (1000 USDC with 6 decimals)
        uint256 amount = 1000 * 1e6;

        // Start broadcast with private key
        vm.startBroadcast(privateKey);

        // Attach to existing contract and mint
        MockUSDC mockUsdc = MockUSDC(mockUsdcAddress);
        mockUsdc.mint(recipient, amount);

        vm.stopBroadcast();
    }
}
