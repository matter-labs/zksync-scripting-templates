import { type Hex, parseUnits } from "viem";

import ERC20_ABI from "../abi/ERC20";

import { getAccount, getPublicClient, getWalletClient } from "../utils/client";
import { LOCAL_RICH_WALLETS } from "../utils/constants";

const EXAMPLE_ERC20_TOKEN = {
  address: "0xF38E1Ce18214DF71f4c2101eefA14dfC98000421" as Hex,
  decimals: 18,
}

const WALLET_PRIVATE_KEY = LOCAL_RICH_WALLETS[0].privateKey;
const account = getAccount(WALLET_PRIVATE_KEY);
const publicClient = getPublicClient();
const walletClient = getWalletClient(account);

// Read contract
const readContract = async () => {
  const balance = await publicClient.readContract({
    address: EXAMPLE_ERC20_TOKEN.address,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: [account.address],
  });
}

// Write contract
const writeContract = async () => {
  const transactionHash = await walletClient.writeContract({
    address: EXAMPLE_ERC20_TOKEN.address,
    abi: ERC20_ABI,
    functionName: "approve",
    args: [account.address, parseUnits("100", EXAMPLE_ERC20_TOKEN.decimals)],
  });

  const receipt = await publicClient.waitForTransactionReceipt({ hash: transactionHash});
}