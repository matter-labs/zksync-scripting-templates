This is a [ZKsync](https://zksync.io) + [ethers v6](https://docs.ethers.org/v6/) + [Node.js](https://nodejs.org/) project in TypeScript bootstrapped with [`zksync-cli`](https://github.com/matter-labs/zksync-cli)

# Prerequisites

- [Node.js](https://nodejs.org/) v18.x or higher

# Getting Started

- Make sure to install the dependencies with `npm install`
- Write your code in `src/main.ts`
- Run `npm run start` in your terminal to run your code

# Configuration

By default your code will be run against ZKsync Sepolia Testnet. If you wish to use a different network, you can change the `defaultChain` in `src/utils/chains.ts` file.

Alternatively, you can use `getProvider` or `getWallet` with a custom `chain` parameter.

# Learn more

To learn more about [ZKsync](https://zksync.io) or [ethers v6](https://docs.ethers.org/v6/), check out the following resources:

- [ZKsync Documentation](https://docs.zksync.io/build)
- [ethers v6 Documentation](https://docs.ethers.org/v6/)
