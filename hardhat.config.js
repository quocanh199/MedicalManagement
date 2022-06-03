require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const PRIVATE_KEY =
  "ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f";
module.exports = {
  solidity: {
    version: "0.8.1",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hpa22023: {
      url: `http://18.183.195.77:8545`,
      accounts: [`${PRIVATE_KEY}`],
    },
  },
};
