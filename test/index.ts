import { expect } from "chai";
import { formatEther, parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

describe("Donation", function () {
  it("After donate total amount equal donate value", async function () {
    const Donation = await ethers.getContractFactory("Donation");
    const donation = await Donation.deploy();
    await donation.deployed();
    const [owner] = await ethers.getSigners();

    const totalAmountBefore = await donation.getTotalAmount(owner.address);

    expect(formatEther(totalAmountBefore)).to.equal("0.0");

    const donateAmount = "100";
    const donateTx = await donation.donate({
      value: parseEther(donateAmount),
    });
    await donateTx.wait();
    const donateTx2 = await donation.donate({
      value: parseEther(donateAmount),
    });
    await donateTx2.wait();

    const totalAmountAfter = await donation.getTotalAmount(owner.address);

    expect(formatEther(totalAmountAfter)).to.equal("200.0");
  });

  it("Withdraw amount", async function () {
    const Donation = await ethers.getContractFactory("Donation");
    const donation = await Donation.deploy();
    await donation.deployed();

    const [, addr1] = await ethers.getSigners();

    const donateTx = await donation.donate({
      value: parseEther("100"),
    });
    await donateTx.wait();

    const balanceBefore = formatEther(await addr1.getBalance());

    const amountWithdraw = 50;
    const txWithdaw = await donation.withdrawal(
      parseEther(String(amountWithdraw)),
      addr1.address
    );
    await txWithdaw.wait();

    const balanceAfter = formatEther(await addr1.getBalance());

    expect(Number(balanceAfter)).to.equal(
      Number(balanceBefore) + amountWithdraw
    );
  });

  it("Get donaters", async function () {
    const Donation = await ethers.getContractFactory("Donation");
    const donation = await Donation.deploy();
    await donation.deployed();

    const [owner] = await ethers.getSigners();

    const donateTx = await donation.donate({
      value: parseEther("100"),
    });
    await donateTx.wait();

    const donaters = await donation.getDonaters();

    expect(donaters).include(owner.address);
  });

  it("Not less than zero test", async function () {
    const Donation = await ethers.getContractFactory("Donation");
    const donation = await Donation.deploy();
    await donation.deployed();

    await expect(
      donation.donate({
        value: parseEther("0"),
      })
    ).to.be.revertedWith("Not less than zero.");
  });
});
