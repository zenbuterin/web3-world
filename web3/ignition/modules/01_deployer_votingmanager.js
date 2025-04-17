
const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploy contract menggunakan akun ini", deployer.address);
    const contract = await hre.ethers.deployContract("VotingManager");
    await contract.waitForDeployment();
    console.log("VotingManager deployed to (contract addresss is = ):", await contract.getAddress());
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
