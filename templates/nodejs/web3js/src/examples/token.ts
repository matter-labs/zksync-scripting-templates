import {Address, Web3} from "web3";
import {ZkSyncPlugin} from "web3-plugin-zksync";
import {LOCAL_RICH_WALLETS} from "../utils/constants";
import {Numbers} from "web3-types";
import {ERC20TokenAbi} from "../utils/ERC20Token";
import {ethereumMainnet} from "../utils/chains";


const web3 = new Web3(ethereumMainnet.rpcUrl);
web3.registerPlugin(ZkSyncPlugin)


const EXAMPLE_ERC20_TOKEN = {
    address: "0xF38E1Ce18214DF71f4c2101eefA14dfC98000421",
    l1Address: "0x5C221E77624690fff6dd741493D735a17716c26B",
    decimals: 18,
}

const ANOTHER_WALLET_ADDRESS = LOCAL_RICH_WALLETS[1].address;
const WALLET_PRIVATE_KEY = LOCAL_RICH_WALLETS[0].privateKey;
const account = web3.eth.accounts.privateKeyToAccount(WALLET_PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);

// Get ETH balance of any address
const getETHBalanceByAddress = async () => {
    const balance = await web3.eth.getBalance(account.address);

    const formattedBalance = web3.utils.fromWei(balance, 'wei'); // e.g. "1550.248"
}

// Get ERC20 balance of any address
const getERC20BalanceByAddress = async () => {
    const contract = new web3.eth.Contract(ERC20TokenAbi, EXAMPLE_ERC20_TOKEN.address)
    const balance = await contract.methods.balanceOf(account.address).call();
}

// Get L1 address having L2 address
const getL1Address = async () => {
    const l1Address = await web3.zkSync.getL1Address(EXAMPLE_ERC20_TOKEN.address);
}

// Get L2 address having L1 address
const getL2Address = async () => {
    const l2Address = await web3.zkSync.getL2Address(EXAMPLE_ERC20_TOKEN.l1Address);
}

// Get other token info
const getTokenInfo = async (tokenAddress: Address) => {
    const contract = new web3.eth.Contract(ERC20TokenAbi, tokenAddress)
    const [name, symbol, decimals, totalSupply] = await Promise.all([
        contract.methods.name().call(),
        contract.methods.symbol().call(),
        contract.methods.decimals().call(),
        contract.methods.totalSupply().call(),
    ]);
}

// Transfer ETH
const transferETH = async () => {
    return web3.eth.sendTransaction({
        from: account.address, // should be added to wev3.eth.accounts.wallet
        to: ANOTHER_WALLET_ADDRESS,
        value: web3.utils.toWei("0.1", "ether"),
    })
}

// Transfer ERC20
const transferERC20 = async (tokenAddress: Address, from: Address, to: Address, amount: Numbers) => {
    const contract = new web3.eth.Contract(ERC20TokenAbi, tokenAddress)
    return contract.methods.transfer(to, amount).call({
        from // should be added to wev3.eth.accounts.wallet
    });
}
