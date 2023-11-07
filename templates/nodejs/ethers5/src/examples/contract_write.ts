import { Contract } from "zksync-web3";

import { getProvider, getWallet } from "../utils/provider";
import { LOCAL_RICH_WALLETS } from "../utils/constants";
import { ERC20_ABI } from "../utils/tokens";
import { parseAmount } from "../utils/formatters";

const EXAMPLE_ERC20_TOKEN = {
  address: "0xF38E1Ce18214DF71f4c2101eefA14dfC98000421",
  decimals: 18,
}
const WALLET_PRIVATE_KEY = LOCAL_RICH_WALLETS[0].privateKey;
const wallet = getWallet(WALLET_PRIVATE_KEY);
const provider = getProvider();

// Contract write
const contractWrite = async () => {
  const contract = new Contract(EXAMPLE_ERC20_TOKEN.address, ERC20_ABI, wallet);

  // For example, approve another address to spend 100 tokens
  const spender = "0xa1cf087DB965Ab02Fb3CFaCe1f5c63935815f044";
  const transaction = await contract.approve(spender, parseAmount("100", EXAMPLE_ERC20_TOKEN.decimals));

  // Wait for transaction receipt
  const receipt = await provider.waitForTransaction(transaction.hash);
}