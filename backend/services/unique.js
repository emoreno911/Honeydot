//const { Logger } = require('../lib/logger');

require('dotenv').config();

const operatorAddress = process.env.OPERATOR_ADDRESS;
const operatorSeed = process.env.OPERATOR_SEED;
const wsEndPoint = "wss://ws-opal.unique.network";

async function requestAccountBalance(addr) {
    try {
        const balance = 10000;
        console.log(`Balance for ${addr} is: ${balance}`);

        return {
            balance: balance.toString()
        }
    } catch (error) {
        console.log(error);
        return { balance: "req error" }
    }
}


module.exports = {
    requestAccountBalance, 
}