import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  networks: {
    goerli: {
      url: process.env.GOERLI_RPC_ENDPOINT,
      accounts: [process.env.GOERLI_PK1!],
    }
  },
  typechain: {
    outDir: "misc/typechain-types/",
    target: "ethers-v5",
  },
};

export default config;
