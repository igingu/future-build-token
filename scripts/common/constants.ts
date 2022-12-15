import { ethers } from "hardhat";

const Decimals: ethers.BigNumber = ethers.BigNumber.from(21);
const TotalSupplyInTokens: ethers.BigNumber = ethers.BigNumber.from(10 ** 8);
const UnitsPerToken: ethers.BigNumber = ethers.BigNumber.from(10).pow(21);
const TotalSupplyInUnits: ethers.BigNumber =
	TotalSupplyInTokens.mul(UnitsPerToken);

export const Constants = {
	ContractNames: {
		FutureBuildToken: "FutureBuildToken",
		DynamicStaking: "DynamicStaking",
	},
	FutureBuildToken: {
		Name: "FutureBuildToken",
		Symbol: "FTRTKN",
		TotalSupplyInTokens,
		TotalSupplyInUnits,
		Decimals,
	},
	Staking: {
		DynamicStaking: {},
	},
	SECONDS_IN_A_DAY: 8.64e4,
	MILLISECONDS_IN_A_DAY: 8.64e7,
};
