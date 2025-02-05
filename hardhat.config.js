require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545", // URL Ganache
      chainId: 1337,               // Chain ID Ganache
      accounts: [
        "0x2314750764b80839b4b96b524c06013012753c6fede54d08415bb75d255f6d61",           // Private key dari Ganache
        "0xd769e9b5cf0883613006f9a903bb73653d4977861083672764812904f4284203"
      ],
    },
  },
};
//ganti private keynya untuk tersambung kembali ke ganache kecuali yang sudah tersimpan di project ganache