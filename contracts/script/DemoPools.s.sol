// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/BettingPools.sol";
import "../mocks/MockUSDC.sol";

// Script to deploy and seed the application contract with data
// Deploy application contract, launch 5 pools, place bets on them across 3 accounts
contract DemoPoolsScript is Script {
    function run() external {
        // Warp to current block timestamp
        vm.warp(block.timestamp);

        // Load private keys from environment variables
        uint256 deployerKey = vm.envUint("MAIN_PRIVATE_KEY");
        uint256 account1Key = vm.envUint("ACCOUNT1_PRIVATE_KEY");
        uint256 account2Key = vm.envUint("ACCOUNT2_PRIVATE_KEY");
        uint256 account3Key = vm.envUint("ACCOUNT3_PRIVATE_KEY");

        // Get addresses from private keys
        address deployer = vm.addr(deployerKey);
        address account1 = vm.addr(account1Key);
        address account2 = vm.addr(account2Key);
        address account3 = vm.addr(account3Key);

        vm.startBroadcast(deployer);

        // Deploy the mock USDC and mint tokens.
        MockUSDC usdc = new MockUSDC("USDC", "USDC", 6);
        uint256 decimalsFactor = 10 ** usdc.decimals();

        // Mint 1,000,000 USDC to deployer.
        uint256 mintAmountDeployer = 1_000_000 * decimalsFactor;
        usdc.mint(deployer, mintAmountDeployer);

        // Mint 10,000 USDC to accounts 1, 2, and 3.
        uint256 mintAmountAccounts = 10_000 * decimalsFactor;
        usdc.mint(account1, mintAmountAccounts);
        usdc.mint(account2, mintAmountAccounts);
        usdc.mint(account3, mintAmountAccounts);

        // Deploy the BettingPools contract with the USDC token address.
        BettingPools bettingPools = new BettingPools(address(0), address(usdc));

        // Create 5 demo pools.

        // Pool 1: Updated to be about Claude's capabilities
        uint40 pool1BetsCloseAt = uint40(block.timestamp + 3600);
        uint40 pool1DecisionDate = uint40(block.timestamp + 10800);
        bettingPools.createPool(
            BettingPools.CreatePoolParams({
                question: "What will be Claude's primary improvement in its next release?",
                options: ["Code Generation", "Mathematical Reasoning"],
                betsCloseAt: pool1BetsCloseAt,
                decisionDate: pool1DecisionDate,
                imageUrl: "https://res.cloudinary.com/apideck/image/upload/w_196,f_auto/v1689100675/icons/anthropic-claude.png",
                category: "AI",
                creatorName: "@crypto_oracle_42",
                creatorId: "1234",
                closureCriteria: "The criteria for when to grade the bet is when the next Claude release is announced after February 23rd 2025",
                closureInstructions: "If Claude's next release announcement highlights code generation improvements over mathematical reasoning improvements, then the first option wins. Otherwise, the second option wins."
            })
        );

        // TODO: Add these back

        // // Pool 2: Updated to be about World Cup winner
        // uint40 pool2BetsCloseAt = uint40(block.timestamp + 3600);
        // uint40 pool2DecisionDate = uint40(block.timestamp + 10800);
        // bettingPools.createPool(
        //     "Which team will win the 2026 FIFA World Cup?",
        //     ["Brazil", "Argentina"],
        //     pool2BetsCloseAt,
        //     pool2DecisionDate,
        //     "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2018%2F05%2F17%2F17%2F50%2Fworld-cup-2018-3409222__180.jpg&f=1&nofb=1&ipt=65d62756daff56fc369b1d8ccba1754266a4c6dea9946c99c8afeeeade96aee4&ipo=images",
        //     "Sports",
        //     "@sports_master_99"
        // );

        // Pool 3: Updated to be about election prediction
        // uint40 pool3BetsCloseAt = uint40(block.timestamp + 172800);
        // uint40 pool3DecisionDate = uint40(block.timestamp + 259200);
        // bettingPools.createPool(
        //     "Which party will win the 2028 US Presidential Election?",
        //     ["Democratic", "Republican"],
        //     pool3BetsCloseAt,
        //     pool3DecisionDate,
        //     "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thenewspaper.com%2Frlc%2Fpix%2Fvoting3.jpg&f=1&nofb=1&ipt=8c92f4b3f8184f5d4d474d62c5f0be54267220c776c10b04e937aa751d5a5ca5&ipo=images",
        //     "Politics",
        //     "@political_analyst_2024"
        // );

        // // Pool 4: Updated to be about crypto prices
        // uint40 pool4BetsCloseAt = uint40(block.timestamp + 7200);
        // uint40 pool4DecisionDate = uint40(block.timestamp + 14400);
        // bettingPools.createPool(
        //     "What will be the price range of ETH at the end of March 2024?",
        //     ["Under $3000", "Over $3000"],
        //     pool4BetsCloseAt,
        //     pool4DecisionDate,
        //     "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.coinstats.app%2Fportfolio_images%2Fethereum_light.png&f=1&nofb=1&ipt=ce97bc429856da21829909b94c5a386c3a29941bebfe42fbeb1a794822dd04df&ipo=images",
        //     "Crypto",
        //     "@eth_predictor_1337"
        // );

        // // Pool 5: Made-up pool example.
        // // "Is the lottery jackpot over $500M?" with bets closing in 3 hrs and decision in 6 hrs.
        // uint40 pool5BetsCloseAt = uint40(block.timestamp + 10800);
        // uint40 pool5DecisionDate = uint40(block.timestamp + 21600);
        // bettingPools.createPool(
        //     "Is the lottery jackpot over $500M?",
        //     ["Yes", "No"],
        //     pool5BetsCloseAt,
        //     pool5DecisionDate,
        //     "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.imgflip.com%2F2%2F7wbaj9.jpg&f=1&nofb=1&ipt=3129f2869b548ae9cda5bd47668c14dc5336c663ea57776239d85e4c35c0fa65&ipo=images",
        //     "Finance",
        //     "@lottery_guru_777"
        // );

        // Intermediate broadcast to mitigate "Stack too deep" errors.
        // vm.stopBroadcast();

        // // Define a small bet amount: 100 USDC.
        // uint256 betAmount = 100 * decimalsFactor;
        // // Pool 1:
        // // Account 1: Bet on Option 0.
        // vm.startBroadcast(account1Key);
        // usdc.approve(address(bettingPools), betAmount);
        // bettingPools.placeBet(1, 0, betAmount);
        // vm.stopBroadcast();

        // // Account 2: Bet on Option 1.
        // vm.startBroadcast(account2Key);
        // usdc.approve(address(bettingPools), betAmount);
        // bettingPools.placeBet(1, 1, betAmount);
        // vm.stopBroadcast();

        // // Account 3: Bet on Option 0.
        // vm.startBroadcast(account3Key);
        // usdc.approve(address(bettingPools), betAmount);
        // bettingPools.placeBet(1, 0, betAmount);
        // vm.stopBroadcast();

        // // Pool 2:
        // // Account 1: Bet on Option 1.
        // vm.startBroadcast(account1Key);
        // usdc.approve(address(bettingPools), betAmount);
        // bettingPools.placeBet(2, 1, betAmount);
        // vm.stopBroadcast();

        // // Account 2: Bet on Option 0.
        // vm.startBroadcast(account2Key);
        // usdc.approve(address(bettingPools), betAmount);
        // bettingPools.placeBet(2, 0, betAmount);
        // vm.stopBroadcast();

        // // Account 3: Bet on Option 1.
        // vm.startBroadcast(account3Key);
        // usdc.approve(address(bettingPools), betAmount);
        // bettingPools.placeBet(2, 1, betAmount);
        // vm.stopBroadcast();

        // // Pool 3: All accounts bet on Option 0.
        // vm.startBroadcast(account1Key);
        // usdc.approve(address(bettingPools), betAmount);
        // bettingPools.placeBet(3, 0, betAmount);
        // vm.stopBroadcast();

        // vm.startBroadcast(account2Key);
        // usdc.approve(address(bettingPools), betAmount);
        // bettingPools.placeBet(3, 0, betAmount);
        // vm.stopBroadcast();

        // vm.startBroadcast(account3Key);
        // usdc.approve(address(bettingPools), betAmount);
        // bettingPools.placeBet(3, 0, betAmount);
        // vm.stopBroadcast();

        // // Pool 4: All accounts bet on Option 1.
        // vm.startBroadcast(account1Key);
        // usdc.approve(address(bettingPools), betAmount);
        // bettingPools.placeBet(4, 1, betAmount);
        // vm.stopBroadcast();

        // vm.startBroadcast(account2Key);
        // usdc.approve(address(bettingPools), betAmount);
        // bettingPools.placeBet(4, 1, betAmount);
        // vm.stopBroadcast();

        // vm.startBroadcast(account3Key);
        // usdc.approve(address(bettingPools), betAmount);
        // bettingPools.placeBet(4, 1, betAmount);
        // vm.stopBroadcast();

        // Pool 5: No bets are placed.
    }
}
