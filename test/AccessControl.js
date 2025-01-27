const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AccessControl Contract", function () {
let AccessControl;
let accessControl;
let owner;
let addr1;
let addr2;
beforeEach(async function () {
  // Mendapatkan akun yang digunakan
  [owner, addr1, addr2] = await ethers.getSigners();
  // Deploy contract
  AccessControl = await ethers.getContractFactory("AccessControl");
  accessControl = await AccessControl.deploy();
});
describe("Deployment", function () {
  it("should set the deployer as admin", async function () {
    expect(await accessControl.authority(owner.address)).to.equal(0); // 0 untuk Role.admin
  });
});
describe("addAdmin", function () {
  it("should allow admin to add a new admin", async function () {
    await accessControl.addAdmin(addr1.address);
    expect(await accessControl.authority(addr1.address)).to.equal(0); // 0 untuk Role.admin
  });
  it("should revert if non-admin tries to add a new admin", async function () {
    //saya meletakkan await didalam, yang semulanya sebelum expect
    expect(await accessControl.connect(addr1).addAdmin(addr2.address))
      .to.be.revertedWith("kamu bukan atmin");
  });
});
describe("addMemberOrOutAdmin", function () {
  it("should allow admin to add a member", async function () {
    await accessControl.addMemberOrOutAdmin(addr1.address);
    expect(await accessControl.authority(addr1.address)).to.equal(1); // 1 untuk Role.member
  });
  it("should revert if non-admin tries to add a member", async function () {
    //saya meletakkan await didalam, yang semulanya sebelum expect
    expect(await accessControl.connect(addr1).addMemberOrOutAdmin(addr2.address))
      .to.be.revertedWith("kamu bukan atmin");
  });
});
describe("checkRole", function () {
  it("should emit a roleCheck event", async function () {
    await expect(accessControl.checkRole(owner.address))
      .to.emit(accessControl, "roleCheck")
      .withArgs(owner.address, 0); // 0 untuk Role.admin
  });
});
});
