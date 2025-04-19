const {ethers} = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploy contract menggunakan akun ini", deployer.address);
    const VotingManager = await ethers.getContractFactory("VotingManager");
    const contract = await VotingManager.deploy();
    console.log("VotingManager deployed to (contract addresss is = ):", await contract.getAddress());
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
