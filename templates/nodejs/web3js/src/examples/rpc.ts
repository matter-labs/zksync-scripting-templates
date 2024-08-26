import { Web3 } from "web3";
import { types, Web3ZKsyncL2, ZKsyncPlugin } from "web3-plugin-zksync";

export async function rpcPaymasterAddress() {
  const web3: Web3 = new Web3(/* optional L1 provider */);
  web3.registerPlugin(
    new ZKsyncPlugin(
      Web3ZKsyncL2.initWithDefaultProvider(types.Network.Sepolia),
    ),
  );
  const zksync: ZKsyncPlugin = web3.ZKsync;

  console.log(
    "Testnet paymaster address:",
    await zksync.rpc.getTestnetPaymasterAddress(),
  );
}
