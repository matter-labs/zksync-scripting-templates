export type L1Chain = {
  id: number;
  name: string;
  rpcUrl: string;
  blockExplorerUrl?: string;
};
export type Chain = L1Chain & {
  blockExplorerApi?: string;
  l1?: L1Chain;
};

export const ethereumMainnet: L1Chain = {
  id: 1,
  name: "Ethereum Mainnet",
  rpcUrl: "https://rpc.ankr.com/eth",
  blockExplorerUrl: "https://etherscan.io",
}
export const ethereumGoerli: L1Chain = {
  id: 5,
  name: "Ethereum Goerli",
  rpcUrl: "https://rpc.ankr.com/eth_goerli",
  blockExplorerUrl: "https://goerli.etherscan.io",
}
export const ethereumDockerizedNode: L1Chain = {
  id: 9,
  name: "Ethereum Local Node",
  rpcUrl: "http://localhost:8545",
}

export const zkSyncMainnet: Chain = {
  id: 324,
  name: "zkSync Era",
  rpcUrl: "https://mainnet.era.zksync.io",
  blockExplorerUrl: "https://explorer.zksync.io",
  blockExplorerApi: "https://block-explorer-api.mainnet.zksync.io", // Docs: https://block-explorer-api.mainnet.zksync.io/docs
  l1: ethereumMainnet,
}
export const zkSyncTestnet: Chain = {
  id: 280,
  name: "zkSync Era Testnet",
  rpcUrl: "https://testnet.era.zksync.dev",
  blockExplorerUrl: "https://goerli.explorer.zksync.io",
  blockExplorerApi: "https://block-explorer-api.testnets.zksync.dev", // Docs: https://block-explorer-api.testnets.zksync.dev
}

export const zkSyncDockerizedNode: Chain = {
  id: 270,
  name: "Dockerized local node",
  rpcUrl: 'http://localhost:3050',

  // You can start block explorer locally with `npx zksync-cli dev start`
  blockExplorerUrl: "http://localhost:3010",
  blockExplorerApi: "http://localhost:3020", // Docs: http://localhost:3020/docs

  l1: ethereumDockerizedNode,
}
export const zkSyncInMemoryNode: Chain = {
  id: 260,
  name: "In-memory local node",
  rpcUrl: 'http://127.0.0.1:8011',
}

export const chains: Chain[] = [
  zkSyncMainnet,
  zkSyncTestnet,
  zkSyncDockerizedNode,
  zkSyncInMemoryNode
]

export const defaultChain = zkSyncTestnet;