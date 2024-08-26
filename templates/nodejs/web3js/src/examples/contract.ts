import { Bytes, Contract, ContractAbi, Web3 } from "web3";
import {
  ContractFactory,
  types,
  Web3ZKsyncL2,
  ZKsyncPlugin,
  ZKsyncWallet,
} from "web3-plugin-zksync";
import { LOCAL_RICH_WALLETS } from "../utils/constants";
import token from "../utils/token-contract.json";

export async function contractDeploy() {
  const web3: Web3 = new Web3(/* optional L1 provider */);
  web3.registerPlugin(
    new ZKsyncPlugin(
      Web3ZKsyncL2.initWithDefaultProvider(types.Network.Sepolia),
    ),
  );
  const zksync: ZKsyncPlugin = web3.ZKsync;

  const PRIVATE_KEY: string = LOCAL_RICH_WALLETS[0].privateKey;
  const wallet: ZKsyncWallet = new zksync.Wallet(PRIVATE_KEY);

  const contractAbi: ContractAbi = token.abi;
  const contractByteCode: Bytes = token.bytecode;

  // create a ContractFactory that uses the default create deployment type
  const contractFactory: ContractFactory<ContractAbi> = new ContractFactory(
    contractAbi,
    contractByteCode,
    wallet,
  );

  const contract: Contract<ContractAbi> = await contractFactory.deploy([
    "Ducat",
    "Ducat",
    18,
  ]);
  console.log("Contract methods:", contract.methods);
}
