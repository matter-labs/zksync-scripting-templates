import {ZkSyncPlugin} from "web3-zksync-plugin";
import {Web3, Web3BaseProvider, Web3Context} from "web3";

import {type Chain, type L1Chain, defaultChain} from "./chains";

export const getProvider = (chain = defaultChain): Web3Context => {
    const web3Context = new Web3Context(chain.rpcUrl);
    web3Context.setConfig({
        defaultChain: chain.name
    })
    return web3Context
}
export const getL1Provider = (l1Chain: L1Chain) => {
    const web3Context = new Web3Context(l1Chain.rpcUrl);
    web3Context.setConfig({
        defaultChain: l1Chain.name
    })
    return web3Context
}

export const getWallet = (
    privateKey: string,
    options?: {
        // Either chain or provider can be provided
        chain?: Chain;
        provider?: Web3BaseProvider;
    }
): Web3 => {
    const web3 = new Web3((options && options.provider) ?? getProvider(options && options?.chain))
    web3.registerPlugin(new ZkSyncPlugin())
    web3.eth.accounts.wallet.add(privateKey)

    return web3
}
