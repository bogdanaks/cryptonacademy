import { task } from "hardhat/config";

import "@nomiclabs/hardhat-ethers";

interface GetDonatersArgs {
  contract: string;
}

task("get-total-amount", "Get total amount")
  .addParam("contract", "Contract address")
  .setAction(async (args: GetDonatersArgs, hre) => {
    const Donation = await hre.ethers.getContractAt("Donation", args.contract);
    const totalAmount = await Donation.getTotalAmount();

    console.log(`Total amount: ${totalAmount}`);
  });

export {};
