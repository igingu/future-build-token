import { expect } from "chai";
import { ethers } from "hardhat";
import { Constants } from "../../scripts/common/constants";
import { FutureBuildToken__factory } from "../../misc/typechain-types";
import { FutureBuildToken } from "../../misc/typechain-types/contracts/FutureBuildToken";

describe("FutureBuildToken", () => {
	// We define a fixture to reuse the same setup in every test.
	// We use loadFixture to run this setup once, snapshot that state,
	// and reset Hardhat Network to that snapshot in every test.
	let futureBuildTokenFactory: FutureBuildToken__factory;
	let futureBuildToken: FutureBuildToken;

	before(async () => {
		futureBuildTokenFactory = (await ethers.getContractFactory(
			Constants.ContractNames.FutureBuildToken
		)) as FutureBuildToken__factory;
		futureBuildToken =
			(await futureBuildTokenFactory.deploy()) as FutureBuildToken;
		await futureBuildToken.deployed();
	});

	it("Should deploy with the correct parameters", async () => {
		expect(await futureBuildToken.name()).to.equal(
			Constants.FutureBuildToken.Name
		);
		expect(await futureBuildToken.symbol()).to.equal(
			Constants.FutureBuildToken.Symbol
		);
		expect(await futureBuildToken.totalSupply()).to.equal(
			Constants.FutureBuildToken.TotalSupplyInUnits
		);
	});

	it("Should have correct number of decimals", async () => {
		expect(await futureBuildToken.decimals()).to.equal(
			Constants.FutureBuildToken.Decimals
		);
	});
});
