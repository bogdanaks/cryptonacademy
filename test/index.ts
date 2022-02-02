import { expect } from "chai";
import { formatEther, parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

describe("Donation", function () {
  it("After donate total amount equal donate value", async function () {
    const Donation = await ethers.getContractFactory("Donation");
    const donation = await Donation.deploy();
    await donation.deployed();

    const totalAmountBefore = await donation.getTotalAmount();

    expect(formatEther(totalAmountBefore)).to.equal("0.0");

    const donateTx = await donation.donate({
      value: parseEther("100"),
    });

    await donateTx.wait();

    const totalAmountAfter = await donation.getTotalAmount();

    expect(formatEther(totalAmountAfter)).to.equal("100.0");
  });
});
