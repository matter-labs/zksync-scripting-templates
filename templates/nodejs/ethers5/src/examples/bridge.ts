import { ETH_TOKEN, LOCAL_RICH_WALLETS } from "../utils/constants";
import { getWallet } from "../utils/provider";
import { parseAmount } from "../utils/formatters";

const EXAMPLE_ERC20_TOKEN = {
  address: "0xF38E1Ce18214DF71f4c2101eefA14dfC98000421",
  l1Address: "0x5C221E77624690fff6dd741493D735a17716c26B",
  decimals: 18,
}
const WALLET_PRIVATE_KEY = LOCAL_RICH_WALLETS[0].privateKey;
const wallet = getWallet(WALLET_PRIVATE_KEY);

// Deposit from L1 to L2
const depositETH = async () => {
  const l1Transaction = await wallet.deposit({
    token: ETH_TOKEN.l1Address,
    amount: parseAmount("0.0001", ETH_TOKEN.decimals),
    
    // `to` is optional, if not provided, deposit will be made to the `wallet.address`
    // to: "0xa1cf087DB965Ab02Fb3CFaCe1f5c63935815f044",
  });
  await l1Transaction.wait(); // Wait for transaction to be processed on L2
}

// Deposit ERC20 from L1 to L2
const depositERC20 = async () => {
  const l1Transaction = await wallet.deposit({
    token: EXAMPLE_ERC20_TOKEN.l1Address, // Make sure to use L1 address
    amount: parseAmount("10", EXAMPLE_ERC20_TOKEN.decimals),
    approveERC20: true, // If not enough allowance, approve will be called automatically
  });
  await l1Transaction.wait();
}

// Withdraw ETH from L2 to L1
const withdrawETH = async () => {
  const l2Transaction = await wallet.withdraw({
    token: ETH_TOKEN.l1Address, // For ETH, use L1 address 0x000...000
    amount: parseAmount("0.0001", ETH_TOKEN.decimals),
  });
  await l2Transaction.wait();
}

// Withdraw ERC20 from L2 to L1
const withdrawERC20 = async () => {
  const l2Transaction = await wallet.withdraw({
    token: EXAMPLE_ERC20_TOKEN.address, // Make sure to use L2 address
    amount: parseAmount("10", EXAMPLE_ERC20_TOKEN.decimals),
  });
  await l2Transaction.wait();
}