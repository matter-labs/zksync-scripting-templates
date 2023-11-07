import { type Chain, zkSync, zkSyncTestnet } from "viem/chains";

export const zkSyncDockerizedNode = {
  id: 270,
  name: "Dockerized local node",
  network: "zksync-dockerized-node",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["http://localhost:3050"],
    },
    public: {
      http: ["http://localhost:3050"],
    },
  },
  blockExplorers: {
    default: {
      name: "Local Explorer",
      url: "http://localhost:3010",
    },
  },
  testnet: true
}
export const zkSyncInMemoryNode = {
  id: 260,
  name: "In-memory local node",
  network: "zksync-in-memory-node",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:8011"],
    },
    public: {
      http: ["http://127.0.0.1:8011"],
    },
  },
  testnet: true
}

export const chains: Chain[] = [
  zkSync,
  zkSyncTestnet,
  zkSyncDockerizedNode,
  zkSyncInMemoryNode,
]

export const defaultChain = zkSyncTestnet;