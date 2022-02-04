import { task } from "hardhat/config";

import "@nomiclabs/hardhat-ethers";

interface GetDonatersArgs {
  contract: string;
  address: string;
}

task("get-total-amount", "Get total amount")
  .addParam("contract", "Contract address")
  .addParam("address", "Search address")
  .setAction(async (args: GetDonatersArgs, hre) => {
    const Donation = await hre.ethers.getContractAt("Donation", args.contract);
    const totalAmount = await Donation.getTotalAmount(args.address);

    console.log(`Total amount: ${totalAmount}`);
  });

export {};
