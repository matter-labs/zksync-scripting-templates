import {Web3} from "web3";

import {LOCAL_RICH_WALLETS} from "../utils/constants";
import {ERC20TokenAbi} from "../utils/ERC20Token";
import {ethereumMainnet} from "../utils/chains";

const web3 = new Web3(ethereumMainnet.rpcUrl);

const EXAMPLE_ERC20_TOKEN = {
    address: "0xF38E1Ce18214DF71f4c2101eefA14dfC98000421",
    decimals: 18,
}
const WALLET_PRIVATE_KEY = LOCAL_RICH_WALLETS[0].privateKey;

const account = web3.eth.accounts.privateKeyToAccount(WALLET_PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);

// Contract write
const contractWrite = async () => {
    const contract = new web3.eth.Contract(ERC20TokenAbi, EXAMPLE_ERC20_TOKEN.address);

    // For example, approve another address to spend 100 tokens
    const spender = "0xa1cf087DB965Ab02Fb3CFaCe1f5c63935815f044";
    const transactionReceipt = await contract.methods
        .approve(spender, web3.utils.toWei("100", 'ether')) //decimals = 18
        .send({from: account.address}); // Send transaction from account
}
