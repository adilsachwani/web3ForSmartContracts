const Tx = require('ethereumjs-tx');
const Web3 = require('web3');

const web3 = new Web3('https://ropsten.infura.io/v3/2fd01be421ed440d864daa7353843985');

const account = '0x5A51Ee918d1f0c657e1bF822eFD08b4F4325172f';
const privateKey = Buffer.from('03307208505F41520C77DE84E98CC4E4E449C6371AFD458F12F1432A5404A8B5','hex');

const contractABI = [{"constant":true,"inputs":[],"name":"totalVotes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"castVote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"totalVotes","type":"uint256"}],"name":"voted","type":"event"}];
const contractAddress = '0x349d0ad769da8fcca4dcd4bd1b8b9c499a50b974';

const contract = new web3.eth.Contract(contractABI, contractAddress);
const data = contract.methods.castVote().encodeABI();

web3.eth.getTransactionCount(account, (err, txCount ) => {

    //Build the trasaction
    const txObject = {
        nonce : web3.utils.toHex(txCount),
        gasLimit : web3.utils.toHex(1000000),
        gasPrice : web3.utils.toHex(web3.utils.toWei('10','gwei')),
        data : data,
        to : contractAddress
    }

    //Sign the transaction
    const tx = new Tx(txObject);
    tx.sign(privateKey);

    const serializedTransaction = tx.serialize();
    const raw = '0x' + serializedTransaction.toString('hex');

    //Broadcast the Transaction
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {

        console.log('txHash', txHash);

    })

});