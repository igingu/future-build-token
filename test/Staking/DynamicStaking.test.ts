import { expect } from "chai";
import { ethers } from "hardhat";
import {
	DynamicStaking,
	DynamicStaking__factory,
	FutureBuildToken,
	FutureBuildToken__factory,
} from "../../misc/typechain-types";
import { Constants } from "../../scripts/common/constants";
import { getDayInSecondsByOffset } from "../../scripts/common/utils";

describe("DynamicStaking", () => {
	let futureBuildTokenFactory: FutureBuildToken__factory;
	let futureBuildToken: FutureBuildToken;

	let dynamicStakingFactory: DynamicStaking__factory;
	let dynamicStaking: DynamicStaking;

	const startTime = getDayInSecondsByOffset(0);
	const endTime = getDayInSecondsByOffset(1);
	const rewardRate = 1;

	before(async () => {
		futureBuildTokenFactory = (await ethers.getContractFactory(
			Constants.ContractNames.FutureBuildToken
		)) as FutureBuildToken__factory;
		futureBuildToken =
			(await futureBuildTokenFactory.deploy()) as FutureBuildToken;
		await futureBuildToken.deployed();

		dynamicStakingFactory = (await ethers.getContractFactory(
			Constants.ContractNames.DynamicStaking
		)) as DynamicStaking__factory;
		dynamicStaking = (await dynamicStakingFactory.deploy(
			startTime,
			endTime,
			rewardRate,
			futureBuildToken.address,
			futureBuildToken.address
		)) as DynamicStaking;
		await dynamicStaking.deployed();
	});

	it("Should allow you to stake", async () => {
		await expect(futureBuildToken.approve(dynamicStaking.address, 1000)).to.not
			.be.reverted;
		await expect(dynamicStaking.stake(1000)).to.not.be.reverted;
	});
});

// it("Should deploy with the correct parameters", async () => {
//     expect(await futureBuildToken.name()).to.equal(Constants.FutureBuildToken.Name);
//     expect(await futureBuildToken.symbol()).to.equal(Constants.FutureBuildToken.Symbol);
//     expect(await futureBuildToken.totalSupply()).to.equal(Constants.FutureBuildToken.TotalSupplyInUnits);
// });

// it("Should have correct number of decimals", async () => {
//     expect(await futureBuildToken.decimals()).to.equal(Constants.FutureBuildToken.Decimals);
// })
