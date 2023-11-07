import { type Hex } from "viem";

import ERC20_ABI from "../abi/ERC20";

import { getPublicClient, getWalletClient } from "./client";

export const getERC20Balance = async ({ publicClient, address, tokenAddress }: {publicClient: ReturnType<typeof getPublicClient>; address: Hex; tokenAddress: Hex}) => {
  return await publicClient.readContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: [address],
  });
}
export const transferERC20 = async ({ walletClient, tokenAddress, to, amount }: {walletClient: ReturnType<typeof getWalletClient>; tokenAddress: Hex; to: Hex; amount: bigint}) => {
  return await walletClient.writeContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "transfer",
    args: [to, amount],
  });
}