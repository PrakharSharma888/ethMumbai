import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{
      version: '0.8.23',
      settings: {
        optimizer: { enabled: false, runs: 200 }
      }
    }]
  }

};

export default config;
