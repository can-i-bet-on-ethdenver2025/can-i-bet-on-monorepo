## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build --via-ir
```

### Deploy

Set all required env vars. with `source /path/to/.env`.

```shell
$ forge script script/DemoPools.s.sol --rpc-url $BASE_SEPOLIA_RPC_URL --broadcast --private-keys $MAIN_PRIVATE_KEY --private-keys $ACCOUNT1_PRIVATE_KEY --private-keys $ACCOUNT2_PRIVATE_KEY --private-keys $ACCOUNT3_PRIVATE_KEY --via-ir
```

### Verify

Set VERIFIER_URL="https://api-sepolia.basescan.org/api?" env var and ETHERSCAN_API_KEY to your Basescan API key.

First you need to get the ABI-encoded deployment args.

```shell
$ cast abi-encode "constructor(address,address)" <0xFunctionsRouterAddress> <0xUsdcAddress>
```

```shell
$ forge verify-contract <Deployed Contract Address> BettingPools --watch --verifier-url "https://api-sepolia.basescan.org/api?" --chain-id 84532 --via-ir --constructor-args <ABI Encoded Args>
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```