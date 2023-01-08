import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import "hardhat-abi-exporter";
import "hardhat-gas-reporter";
import "solidity-coverage";


import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
	solidity: "0.8.17",
	etherscan: {
		apiKey: process.env.ETHERSCAN_API_KEY,
	},
	networks: {
		goerli: {
			url: process.env.GOERLI_RPC_ENDPOINT,
			accounts: [process.env.GOERLI_PK1!],
		},
	},
	abiExporter: {
		path: "misc/abi",
		runOnCompile: true,
		pretty: true,
	},
	typechain: {
		outDir: "misc/typechain-types/",
		target: "ethers-v5",
	},
	gasReporter: {
		coinmarketcap: process.env.COINMARKETCAP_API_KEY,
		currency: "EUR",
		enabled: process.env.REPORT_GAS ? true : false,
		showTimeSpent: true,
	},
};

export default config;
