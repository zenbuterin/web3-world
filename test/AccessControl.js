const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture, time } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

//we will use fixture
//kita bisa menggunakan deploy contract menggunakan hre
//dan bisa menggunakan contractfactory kemudian deploy dan deployed
describe("permulaan", () => {
    let VotingManager, myContract, owner, other;
    async function deployfixture() {
        [owner, other] = await ethers.getSigners(); // Ambil akun pertama sebagai deployer
        VotingManager = await ethers.getContractFactory("VotingManager");
        myContract = await VotingManager.deploy();
        return {myContract, owner, other};
    };

    it("Should deploy the contract successfully", async function () {
        const { myContract, owner } = await loadFixture(deployfixture);
        expect(await myContract.authority(owner)).to.equal(true);
    });

    it("memeriksa add admin berfungsi atau tidak", async function () {
        const { myContract, other } = await loadFixture(deployfixture);
        await myContract.addAdmin(other.address);
        expect(await myContract.authority(other.address)).to.equal(true);
    })

    it("remove addmin akan membuat sebuah address jadi false", async function () {
        const { myContract, other } = await loadFixture(deployfixture);
        await myContract.removeAdmin(other.address);
        expect(await myContract.authority(other.address)).to.equal(false);
    })

    it("createDeadLine function", async function () {
        const { myContract } = await loadFixture(deployfixture);
        let waktusekarang = await time.latest();
        await myContract.createDeadLine(86400)
        expect(await myContract.timesOver()).to.above(waktusekarang);
    } )
})
