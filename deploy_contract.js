const Tx = require('ethereumjs-tx');
const Web3 = require('web3');

const web3 = new Web3('https://ropsten.infura.io/v3/2fd01be421ed440d864daa7353843985');

const account = '0x5A51Ee918d1f0c657e1bF822eFD08b4F4325172f';
const privateKey = Buffer.from('03307208505F41520C77DE84E98CC4E4E449C6371AFD458F12F1432A5404A8B5','hex');

const data = '0x60806040526000805534801561001457600080fd5b50610102806100246000396000f3fe6080604052600436106043576000357c0100000000000000000000000000000000000000000000000000000000900480630d15fd771460485780630fb524ce146070575b600080fd5b348015605357600080fd5b50605a6084565b6040518082815260200191505060405180910390f35b348015607b57600080fd5b506082608a565b005b60005481565b60008081548092919060010191905055507f8fbb38ff86a5b319c33b22609be0afce04335d5db18c6bd100767e251d4028cc6000546040518082815260200191505060405180910390a156fea165627a7a723058207032d5d2616cfcc204d4e42d99aa14447eb1d85bc3ab5c05fc13be63d17a54a00029';

web3.eth.getTransactionCount(account, (err, txCount ) => {

    //Build the trasaction
    const txObject = {
        nonce : web3.utils.toHex(txCount),
        gasLimit : web3.utils.toHex(1000000),
        gasPrice : web3.utils.toHex(web3.utils.toWei('10','gwei')),
        data : data
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