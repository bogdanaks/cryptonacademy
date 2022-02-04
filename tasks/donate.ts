import { task } from "hardhat/config";
import { parseEther } from "ethers/lib/utils";

import "@nomiclabs/hardhat-ethers";

interface DonateArgs {
  contract: string;
  amount: string;
}

task("donate", "Pay donate on contract")
  .addParam("contract", "Contract address")
  .addParam("amount", "Amount donate ethers")
  .setAction(async (args: DonateArgs, hre) => {
    const Donation = await hre.ethers.getContractAt("Donation", args.contract);

    const donateTx = await Donation.donate({
      value: parseEther(args.amount || "1"),
    });
    await donateTx.wait();

    console.log(`Successfully donated ${args.amount}`);
  });

export {};
