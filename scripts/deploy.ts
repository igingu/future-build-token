import { ethers } from "hardhat";
import { FutureBuildToken, FutureBuildToken__factory } from "../typechain-types";
import { Constants } from "./common/constants";

// import * as hre from "hardhat";

async function main() {
	const futureBuildTokenContractFactory: FutureBuildToken__factory = await ethers.getContractFactory(Constants.ContractNames.FutureBuildToken) as FutureBuildToken__factory;
	const futureBuildTokenContract: FutureBuildToken = await futureBuildTokenContractFactory.deploy() as FutureBuildToken;
	await futureBuildTokenContract.deployed();

	console.log(`Deployed FutureBuildToken contract at ${futureBuildTokenContract.address} address.`);

	// await hre.run("verify:verify", { address: futureBuildTokenContract.address });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
