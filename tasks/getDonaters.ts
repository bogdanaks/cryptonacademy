import { task } from "hardhat/config";

import "@nomiclabs/hardhat-ethers";

interface GetDonatersArgs {
  contract: string;
}

task("get-donaters", "Get donaters list")
  .addParam("contract", "Contract address")
  .setAction(async (args: GetDonatersArgs, hre) => {
    const Donation = await hre.ethers.getContractAt("Donation", args.contract);
    const donaters = await Donation.getDonaters();

    console.log(`Donaters: \n${donaters.join("\n")}`);
  });

export {};
