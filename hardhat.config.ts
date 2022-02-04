import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

import "./tasks/donate";
import "./tasks/getDonaters";
import "./tasks/getTotalAmount";
import "./tasks/withdrawal";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.11",
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: !!process.env.REPORT_GAS,
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_KEY,
    token: "MATIC",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
