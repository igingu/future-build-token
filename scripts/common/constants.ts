import { ethers } from "hardhat";
import { MinEthersFactory } from "../../typechain-types/common";

const Decimals: ethers.BigNumber = ethers.BigNumber.from(21);
const TotalSupplyInTokens: ethers.BigNumber = ethers.BigNumber.from(10 ** 8);
const UnitsPerToken: ethers.BigNumber = ethers.BigNumber.from(10).pow(21);
const TotalSupplyInUnits: ethers.BigNumber = TotalSupplyInTokens.mul(UnitsPerToken);

export const Constants = {
    ContractNames: {
        FutureBuildToken: "FutureBuildToken"
    },
    FutureBuildToken: {
        Name: "FutureBuildToken",
        Symbol: "FTRTKN",
        TotalSupplyInTokens,
        TotalSupplyInUnits,
        Decimals,
    }
}