# FutureBuild Token

Personal project to learn Solidity.

## Key features:
---
### ERC20 Token:
- FutureBuild Token (FTRTKN)
- 18 decimals
- Initial supply of 100 million:
    - 10% reserved for owners
    - 15% reserved for developers
    - 25 to pre-launch investors
    - 25% for sale on the open market
    - 5% for air-drop
    - remaining 25% locked and accessible only for investing in community projects
- Once deployed, initializes a TokenSale contract.

### TokenSale:
- Initial investors receive their shar of the token pool
- Developers receive their share of the token pool, but with vesting:
    - 10% first year
    - 25% second year
    - 25% third year
    - 40% fourth year
- Users should be able to buy tokens using ETH or stablecoins like USDC. There should be a fixed price for this sale. Need to get ETH/USD conversion

# Features to think about:
---
### Staking
### DAO
### Using users' staked FutureBuildToken to provide liquidy in LP
### Flash loans
### KYC
### Betting on prediction market

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

## Setup 
* ```npm install```
* if using VsCode for development, add the following to ```settings.json```:
    * ```
        "solidity.remappings": [
            "@openzeppelin/=~node_modules/@openzeppelin/"
        ]
        ```
