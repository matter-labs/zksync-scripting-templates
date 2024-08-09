import { ethers } from "ethers";
import { Provider, Wallet } from "zksync-ethers";

import { type Chain, type L1Chain, defaultChain } from "./chains";

export const getProvider = (chain = defaultChain): Provider => {
  return new Provider(chain.rpcUrl, { chainId: chain.id, name: chain.name });
}
export const getL1Provider = (l1Chain: L1Chain) => {
  return new ethers.JsonRpcProvider(l1Chain.rpcUrl, { chainId: l1Chain.id, name: l1Chain.name });
}

export const getWallet = (
    privateKey: string | ethers.SigningKey,
    options?: {
      // Either chain or provider can be provided
      chain?: Chain;
      provider?: Provider;
      
      l1Provider?: ethers.Provider;
    }
  ): Wallet => {
  const provider = options?.provider || getProvider(options?.chain);
  const l1Provider = options?.l1Provider || options?.chain?.l1 ? getL1Provider(options.chain!.l1!) : undefined;
  return new Wallet(privateKey, provider, l1Provider);
}