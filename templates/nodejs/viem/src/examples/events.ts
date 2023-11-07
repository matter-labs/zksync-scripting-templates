import { type Hex } from "viem";

import ERC20_ABI from "../abi/ERC20";

import { getAccount, getPublicClient, getWalletClient } from "../utils/client";
import { LOCAL_RICH_WALLETS } from "../utils/constants";

const EXAMPLE_ERC20_TOKEN = {
  address: "0xF38E1Ce18214DF71f4c2101eefA14dfC98000421" as Hex,
  decimals: 18,
}

const ANOTHER_WALLET_ADDRESS = LOCAL_RICH_WALLETS[1].address;
const WALLET_PRIVATE_KEY = LOCAL_RICH_WALLETS[0].privateKey;
const account = getAccount(WALLET_PRIVATE_KEY);
const publicClient = getPublicClient();
const walletClient = getWalletClient(account);

walletClient.deployContract({
  abi: ERC20_ABI,
  bytecode: "0x608060405234801561001057600080fd5b506101a3806100206000396000f3fe608060405260043610610041576000357c0100",
});

// Watch contract events
const watchContractEvents = async () => {
  const unwatch = publicClient.watchContractEvent({
    address: EXAMPLE_ERC20_TOKEN.address,
    abi: ERC20_ABI,
    onLogs: (logs) => {
      // Do something
    }
  });

  // Stop watching
  // unwatch();
}

// Watch latest transactions
const watchTransactions = async () => {
  const unwatch = publicClient.watchPendingTransactions({
    onTransactions: (hashes) => {
      // Do something
    }
  });

  // Stop watching
  // unwatch();
}