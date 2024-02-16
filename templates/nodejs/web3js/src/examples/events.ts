import {BlockHeaderOutput, Web3} from "web3";

import {ERC20TokenAbi} from "../utils/ERC20Token";
import {ethereumMainnet} from "../utils/chains";


const web3 = new Web3(ethereumMainnet.rpcUrl);


const EXAMPLE_ERC20_TOKEN = {
    address: "0xF38E1Ce18214DF71f4c2101eefA14dfC98000421",
    decimals: 18,
}
// Watch contract events
const watchContractEvents = async () => {
    const contract = new web3.eth.Contract(ERC20TokenAbi, EXAMPLE_ERC20_TOKEN.address);
    const event = contract.events.Transfer();
    event.on('data', data => {
        // data.returnValues.from
        // data.returnValues.to
        // data.returnValues.value
        // Do something
    });

    // Stop watching
    await event.unsubscribe()
}

// Watch latest transactions
const watchTransactions = async () => {
    const newHeadsSubscription = await web3.eth.subscribe('newHeads');

    newHeadsSubscription.on('data', (data: BlockHeaderOutput) => {
        // Do something
    })
    await newHeadsSubscription.unsubscribe()
}
