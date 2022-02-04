import { task } from "hardhat/config";

import "@nomiclabs/hardhat-ethers";
import { parseEther } from "ethers/lib/utils";

interface WithdrawalArgs {
  contract: string;
  amount: string;
  withdrawaladdress: string;
}

task("withdrawal", "Withdrawal")
  .addParam("contract", "Contract address")
  .addParam("amount", "Amount withdraw ethers")
  .addParam("withdrawaladdress", "Payout address")
  .setAction(async (args: WithdrawalArgs, hre) => {
    const Donation = await hre.ethers.getContractAt("Donation", args.contract);
    const wdTx = await Donation.withdrawal(
      parseEther(args.amount),
      args.withdrawaladdress
    );
    await wdTx.wait();

    console.log(
      `Withdrawal successfully on amount ${args.amount} to address ${args.withdrawaladdress}`
    );
  });

export {};
