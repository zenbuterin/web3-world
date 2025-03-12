const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploy contract menggunakan akun ini", deployer.address);
    const contract = await hre.ethers.deployContract("VotingManager");
    await contract.waitForDeployment();
    console.log("VotingManager deployed to:", await contract.getAddress());

    // const fs = require('fs');
    // const contractData = {
    //     address: contract.address,
    //     abi: JSON.parse(contract.interface.format(ethers.utils.FormatTypes.json))
    // };
    // fs.writeFileSync("votingdapp/src/app/dataContract.json", JSON.stringify(contractData));
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

