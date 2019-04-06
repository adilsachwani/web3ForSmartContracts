const Tx = require('ethereumjs-tx');
const Web3 = require('web3');

const web3 = new Web3('https://ropsten.infura.io/v3/2fd01be421ed440d864daa7353843985');

const account = '0x5A51Ee918d1f0c657e1bF822eFD08b4F4325172f';
const privateKey = Buffer.from('03307208505F41520C77DE84E98CC4E4E449C6371AFD458F12F1432A5404A8B5','hex');

const contractABI = [{"constant":true,"inputs":[],"name":"totalVotes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"castVote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
const contractAddress = '0xd546baf0dacac8fd193a622bda32749b2df47352';

const contract = new web3.eth.Contract(contractABI, contractAddress);

contract.methods.totalVotes().call({from: account}, (err,res) => { console.log(res); } )