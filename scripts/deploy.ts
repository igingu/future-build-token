import { ethers } from "hardhat";
import { Constants } from "./common/constants";

import * as hre from "hardhat";

async function main() {
  const futureBuildTokenContractFactory: ethers.ContractFactory = await ethers.getContractFactory(Constants.ContractNames.FutureBuildToken);
  const futureBuildTokenContract: ethers.Contract = await futureBuildTokenContractFactory.deploy();
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
