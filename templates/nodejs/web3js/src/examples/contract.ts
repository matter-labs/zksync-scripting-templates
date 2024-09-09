import { Bytes, Contract, Web3 } from "web3";
import {
  ContractFactory,
  types,
  Web3ZKsyncL2,
  ZKsyncPlugin,
  ZKsyncWallet,
} from "web3-plugin-zksync";
import { LOCAL_RICH_WALLETS } from "../utils/constants";
import { TOKEN_CONTRACT, TokenContractAbiType } from "../utils/token-contract";

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

  const contractAbi: TokenContractAbiType = TOKEN_CONTRACT.abi;
  const contractByteCode: Bytes = TOKEN_CONTRACT.bytecode;

  // create a ContractFactory that uses the default create deployment type
  const contractFactory: ContractFactory<TokenContractAbiType> =
    new ContractFactory(contractAbi, contractByteCode, wallet);

  const contract: Contract<TokenContractAbiType> = await contractFactory.deploy(
    ["Ducat", "Ducat", 18],
  );
  console.log("Contract address:", contract.options.address);
  console.log("Contract methods:", contract.methods);
}
