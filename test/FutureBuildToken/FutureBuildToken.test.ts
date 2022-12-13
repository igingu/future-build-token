// import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
// import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Constants } from "../../scripts/common/constants";

describe("FutureBuildToken", () => {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    let futureBuildTokenContractFactory: ethers.ContractFactory;
    let futureBuildTokenContract: ethers.Contract;

    before(async () => {
        futureBuildTokenContractFactory = await ethers.getContractFactory(Constants.ContractNames.FutureBuildToken);
        futureBuildTokenContract = await futureBuildTokenContractFactory.deploy();
        await futureBuildTokenContract.deployed();
    });

    it("Should deploy with the correct parameters", async () => {
        expect(await futureBuildTokenContract.name()).to.equal(Constants.FutureBuildToken.Name);
        expect(await futureBuildTokenContract.symbol()).to.equal(Constants.FutureBuildToken.Symbol);
        expect(await futureBuildTokenContract.totalSupply()).to.equal(Constants.FutureBuildToken.TotalSupplyInUnits);
    });

    it("Should have correct number of decimals", async () => {
        expect(await futureBuildTokenContract.decimals()).to.equal(Constants.FutureBuildToken.Decimals);
    })
});
