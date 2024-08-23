import {
  zksync,
  type Chain,
} from "viem/chains";

export const zksyncSepoliaTestnet = {
  id: 300,
  name: "ZKsync Sepolia Testnet",
  network: "zksync-sepolia-testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia.era.zksync.dev"],
    },
    public: {
      http: ["https://sepolia.era.zksync.dev"],
    },
  },
  blockExplorers: {
    default: {
      name: "Block Explorer",
      url: "https://sepolia.explorer.zksync.io",
    },
  },
  testnet: true
}
export const zksyncDockerizedNode = {
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
export const zksyncInMemoryNode = {
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
  zksync,
  zksyncSepoliaTestnet,
  zksyncDockerizedNode,
  zksyncInMemoryNode,
]

export const defaultChain = zksyncSepoliaTestnet;
