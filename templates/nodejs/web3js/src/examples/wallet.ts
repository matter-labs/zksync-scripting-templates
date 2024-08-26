import { TransactionReceipt, utils, Web3 } from "web3";
import {
  constants,
  types,
  Web3ZKsyncL2,
  ZKsyncPlugin,
  ZKsyncWallet,
} from "web3-plugin-zksync";
import { ethereumSepolia } from "../utils/chains";
import { LOCAL_RICH_WALLETS } from "../utils/constants";

export async function walletAddress() {
  const web3: Web3 = new Web3(/* optional L1 provider */);
  web3.registerPlugin(
    new ZKsyncPlugin(
      Web3ZKsyncL2.initWithDefaultProvider(types.Network.Sepolia),
    ),
  );
  const zksync: ZKsyncPlugin = web3.ZKsync;

  const PRIVATE_KEY: string = LOCAL_RICH_WALLETS[0].privateKey;
  const wallet: ZKsyncWallet = new zksync.Wallet(PRIVATE_KEY);

  console.log("Wallet address:", await wallet.getAddress());
}

export async function walletDeposit() {
  const web3: Web3 = new Web3(ethereumSepolia.rpcUrl);
  web3.registerPlugin(
    new ZKsyncPlugin(
      Web3ZKsyncL2.initWithDefaultProvider(types.Network.Sepolia),
    ),
  );
  const zksync: ZKsyncPlugin = web3.ZKsync;

  const PRIVATE_KEY: string = LOCAL_RICH_WALLETS[0].privateKey;
  const wallet: ZKsyncWallet = new zksync.Wallet(PRIVATE_KEY);
  const senderL1BeginningBalance: bigint = await wallet.getBalanceL1();

  const receiver: string = LOCAL_RICH_WALLETS[1].address;
  const receiverL2BeginningBalance: bigint =
    await zksync.L2.getBalance(receiver);

  const tx: types.PriorityOpResponse = await wallet.deposit({
    token: constants.ETH_ADDRESS,
    to: receiver,
    amount: utils.toWei("0.00020", "ether"),
    refundRecipient: wallet.getAddress(),
  });

  const receipt: TransactionReceipt = await tx.waitFinalize();
  console.log("Transaction Hash:", receipt.transactionHash);

  console.log(
    "Sender Change In L1 Balance:",
    (await wallet.getBalanceL1()) - senderL1BeginningBalance,
  );
  console.log(
    "Receiver Change In L2 Balance:",
    (await zksync.L2.getBalance(receiver)) - receiverL2BeginningBalance,
  );
}

export async function walletWithdraw() {
  const web3: Web3 = new Web3(ethereumSepolia.rpcUrl);
  web3.registerPlugin(
    new ZKsyncPlugin(
      Web3ZKsyncL2.initWithDefaultProvider(types.Network.Sepolia),
    ),
  );
  const zksync: ZKsyncPlugin = web3.ZKsync;

  const PRIVATE_KEY: string = LOCAL_RICH_WALLETS[0].privateKey;
  const wallet: ZKsyncWallet = new zksync.Wallet(PRIVATE_KEY);
  const senderL2BeginningBalance: bigint = await wallet.getBalance();

  const receiver: string = LOCAL_RICH_WALLETS[1].address;
  const receiverL1BeginningBalance: bigint =
    await web3.eth.getBalance(receiver);

  const withdrawTx: types.PriorityOpResponse = await wallet.withdraw({
    token: constants.ETH_ADDRESS,
    to: receiver,
    amount: utils.toWei("0.00020", "ether"),
  });

  const receipt: TransactionReceipt = await withdrawTx.waitFinalize();
  console.log("Transaction Hash:", receipt.transactionHash);

  console.log(
    "[Before Finalize Withdrawal] Sender Change In L2 Balance:",
    (await wallet.getBalance()) - senderL2BeginningBalance,
  );
  console.log(
    "[Before Finalize Withdrawal] Receiver Change In L1 Balance:",
    (await web3.eth.getBalance(receiver)) - receiverL1BeginningBalance,
  );

  await wallet.finalizeWithdrawal(receipt.transactionHash);

  console.log(
    "[After Finalize Withdrawal] Sender Change In L2 Balance:",
    (await wallet.getBalance()) - senderL2BeginningBalance,
  );
  console.log(
    "[After Finalize Withdrawal] Receiver Change In L1 Balance:",
    (await web3.eth.getBalance(receiver)) - receiverL1BeginningBalance,
  );
}
