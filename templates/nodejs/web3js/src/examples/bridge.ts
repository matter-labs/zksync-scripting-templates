import {Web3} from "web3";
import {ZkSyncPlugin} from "web3-plugin-zksync";
import {ETH_TOKEN, LOCAL_RICH_WALLETS} from "../utils/constants";
import {ethereumMainnet} from "../utils/chains";

const web3 = new Web3(ethereumMainnet.rpcUrl);
web3.registerPlugin(ZkSyncPlugin)
const EXAMPLE_ERC20_TOKEN = {
    address: "0xF38E1Ce18214DF71f4c2101eefA14dfC98000421",
    l1Address: "0x5C221E77624690fff6dd741493D735a17716c26B",
    decimals: 18,
}
const WALLET_PRIVATE_KEY = LOCAL_RICH_WALLETS[0].privateKey;
const account = web3.eth.accounts.privateKeyToAccount(WALLET_PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);

