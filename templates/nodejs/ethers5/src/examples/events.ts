import { Contract } from "zksync-web3";

import { getProvider } from "../utils/provider";
import { ERC20_ABI } from "../utils/tokens";

const EXAMPLE_ERC20_TOKEN = {
  address: "0xF38E1Ce18214DF71f4c2101eefA14dfC98000421",
  decimals: 18,
}
const provider = getProvider();

// Watch contract events
const watchContractEvents = async () => {
  const contract = new Contract(EXAMPLE_ERC20_TOKEN.address, ERC20_ABI, provider);
  contract.on("Transfer", (from, to, amount, event) => {
    // Do something
  });

  // Stop watching
  // contract.removeAllListeners();
}

// Watch latest transactions
const watchTransactions = async () => {
  provider.on("block", async (blockNumber) => {
    const block = await provider.getBlock(blockNumber);
    const transactions = block.transactions;

    // Do something
  });

  // Stop watching
  // provider.removeAllListeners();
}