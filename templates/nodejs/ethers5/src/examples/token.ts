import { Contract } from "zksync-web3";

import { ETH_TOKEN, LOCAL_RICH_WALLETS } from "../utils/constants";
import { getProvider, getWallet } from "../utils/provider";
import { formatAmount, parseAmount } from "../utils/formatters";
import { ERC20_ABI } from "../utils/tokens";

const EXAMPLE_ERC20_TOKEN = {
  address: "0xF38E1Ce18214DF71f4c2101eefA14dfC98000421",
  l1Address: "0x5C221E77624690fff6dd741493D735a17716c26B",
  decimals: 18,
}
const ANOTHER_WALLET_ADDRESS = LOCAL_RICH_WALLETS[1].address;
const WALLET_PRIVATE_KEY = LOCAL_RICH_WALLETS[0].privateKey;
const wallet = getWallet(WALLET_PRIVATE_KEY);
const provider = getProvider();

// Get ETH balance of the wallet
const getWalletBalance = async () => {
  const balance = await wallet.getBalance();
}

// Get ERC20 balance of the wallet
const getWalletERC20Balance = async () => {
  const balance = await wallet.getBalance(EXAMPLE_ERC20_TOKEN.address);
}

// Get ETH balance of another address
const getETHBalanceByAddress = async () => {
  const balance = await provider.getBalance(ANOTHER_WALLET_ADDRESS);

  const formattedBalance = formatAmount(balance, EXAMPLE_ERC20_TOKEN.decimals); // e.g. "1550.248"
}

// Get ERC20 balance of another address
const getERC20BalanceByAddress = async () => {
  const balance = await provider.getBalance(ANOTHER_WALLET_ADDRESS, undefined, EXAMPLE_ERC20_TOKEN.address);
}

// Get L1 address having L2 address
const getL1Address = async () => {
  const l1Address = await provider.l1TokenAddress(EXAMPLE_ERC20_TOKEN.address);
}

// Get L2 address having L1 address
const getL2Address = async () => {
  const l2Address = await provider.l2TokenAddress(EXAMPLE_ERC20_TOKEN.l1Address);
}

// Get other token info
const getTokenInfo = async () => {
  const contract = new Contract(EXAMPLE_ERC20_TOKEN.address, ERC20_ABI, provider);
  const [name, symbol, decimals, totalSupply] = await Promise.all([
    contract.name(),
    contract.symbol(),
    contract.decimals(),
    contract.totalSupply(),
  ]);

  const formattedTotalSupply = formatAmount(totalSupply, decimals); // e.g. "1550.248"
}

// Transfer ETH
const transferETH = async () => {
  const l2Transaction = await wallet.transfer({
    to: ANOTHER_WALLET_ADDRESS,
    token: ETH_TOKEN.l1Address, // For ETH, use L1 address 0x000...000
    amount: parseAmount("0.0001", ETH_TOKEN.decimals),
  });
  await l2Transaction.wait();
}

// Transfer ERC20
const transferERC20 = async () => {
  const l2Transaction = await wallet.transfer({
    to: ANOTHER_WALLET_ADDRESS,
    token: EXAMPLE_ERC20_TOKEN.address, // Make sure to use L2 address
    amount: parseAmount("10", EXAMPLE_ERC20_TOKEN.decimals),
  });
  await l2Transaction.wait();
}