const Tx = require('ethereumjs-tx');
const Web3 = require('web3');

const web3 = new Web3('https://ropsten.infura.io/v3/2fd01be421ed440d864daa7353843985');

const accountAdil = '0x5A51Ee918d1f0c657e1bF822eFD08b4F4325172f';
const accountNaveed = '0x2Ac9046A20e5A96CC04231ED62606160f62D53c2';

const privateKeyAdil = Buffer.from('03307208505F41520C77DE84E98CC4E4E449C6371AFD458F12F1432A5404A8B5','hex');
const privateKeyNaveed = Buffer.from('1CA0191C2B2D75D74AD68DDB0882EDF47EE143E39CC4778B39FA3D0706E69890','hex');

web3.eth.getTransactionCount(accountNaveed, (err, txCount ) => {

    //Build the trasaction
    const txObject = {
        nonce : web3.utils.toHex(txCount),
        to : accountAdil,
        value : web3.utils.toHex(web3.utils.toWei('1','ether')),
        gasLimit : web3.utils.toHex(21000),
        gasPrice : web3.utils.toHex(web3.utils.toWei('10','gwei'))
    }

    //Sing the transaction
    const tx = new Tx(txObject);
    tx.sign(privateKeyNaveed);

    const serializedTransaction = tx.serialize();
    const raw = '0x' + serializedTransaction.toString('hex');

    //Broadcast the Transaction
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {

        console.log('txHash', txHash);

    })

});