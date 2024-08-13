This is a [ZKsync](https://zksync.io) + [viem](https://viem.sh) + [Node.js](https://nodejs.org/) project in TypeScript bootstrapped with [`zksync-cli`](https://github.com/matter-labs/zksync-cli)

# Prerequisites

- [Node.js](https://nodejs.org/) v18.x or higher

# Getting Started

- Make sure to install the dependencies with `npm install`
- Write your code in `src/main.ts`
- Run `npm run start` in your terminal to run your code

# Configuration

By default your code will be run against ZKsync Sepolia Testnet. If you wish to use a different network, you can change the `defaultChain` in `src/utils/chains.ts` file.

Alternatively, you can use `getPublicClient` or `getWalletClient` with a custom `chain` parameter.

# Learn more

To learn more about [ZKsync](https://zksync.io) or [viem](https://viem.sh), check out the following resources:

- [ZKsync Documentation](https://docs.zksync.io/build)
- [viem Documentation](https://viem.sh)
