require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "http://127.0.0.1:8545", // URL Ganache / anvil
      chainId: 31337,               // Chain ID Ganache(1337) / anvil (31337)
      accounts: [
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",           // Private key dari anvil
        "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
      ],
    },
  },
};
//ganti private keynya untuk tersambung kembali ke ganache kecuali yang sudah tersimpan di project ganache