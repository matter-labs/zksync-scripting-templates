import { type Hex, formatUnits, parseEther, parseUnits } from "viem";

import ERC20_ABI from "../abi/ERC20";

import { getAccount, getPublicClient, getWalletClient } from "../utils/client";
import { LOCAL_RICH_WALLETS } from "../utils/constants";
import { getERC20Balance, transferERC20 } from "../utils/tokens";

const EXAMPLE_ERC20_TOKEN = {
  address: "0xF38E1Ce18214DF71f4c2101eefA14dfC98000421" as Hex,
  decimals: 18,
}

const ANOTHER_WALLET_ADDRESS = LOCAL_RICH_WALLETS[1].address;
const WALLET_PRIVATE_KEY = LOCAL_RICH_WALLETS[0].privateKey;
const account = getAccount(WALLET_PRIVATE_KEY);
const publicClient = getPublicClient();
const walletClient = getWalletClient(account);

// Get ETH balance by address
const getBalance = async () => {
  const balance = await publicClient.getBalance({ 
    address: account.address,
  }); // e.g. 10000000000000000000000n (wei)
}

// Get ERC20 balance by address
const getERC20BalanceByAddress = async () => {
  const balance = await getERC20Balance({
    address: account.address,
    tokenAddress: EXAMPLE_ERC20_TOKEN.address,
    publicClient,
  });

  const formattedBalance = formatUnits(balance, EXAMPLE_ERC20_TOKEN.decimals); // e.g. "1550.248"
}

// Get other token info
const getTokenInfo = async () => {
  const defaultParams = {
    address: EXAMPLE_ERC20_TOKEN.address,
    abi: ERC20_ABI,
  }
  const [name, symbol, decimals, totalSupply] = await Promise.all([
    publicClient.readContract({
      ...defaultParams,
      functionName: "name",
    }),
    publicClient.readContract({
      ...defaultParams,
      functionName: "symbol",
    }),
    publicClient.readContract({
      ...defaultParams,
      functionName: "decimals",
    }),
    publicClient.readContract({
      ...defaultParams,
      functionName: "totalSupply",
    }),
  ]);

  const formattedTotalSupply = formatUnits(totalSupply, decimals); // e.g. "1550.248"
}

// Transfer ETH
const transferETHToAddress = async () => {
  const transactionHash = await walletClient.sendTransaction({
    to: ANOTHER_WALLET_ADDRESS,
    value: parseEther("0.01"),
  });

  const receipt = publicClient.waitForTransactionReceipt({ hash: transactionHash});
}

// Transfer ERC20
const transferERC20ToAddress = async () => {
  const transactionHash = await transferERC20({
    walletClient,
    tokenAddress: EXAMPLE_ERC20_TOKEN.address,
    to: ANOTHER_WALLET_ADDRESS,
    amount: parseUnits("0.01", EXAMPLE_ERC20_TOKEN.decimals),
  });

  const receipt = await publicClient.waitForTransactionReceipt({ hash: transactionHash});
}
