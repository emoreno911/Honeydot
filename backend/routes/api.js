const express = require('express');
const { 
    requestAccountBalance,
} = require('../services/unique');

const router = express.Router();

router.post('/getAccountBalance', async (request, response) => {
	const { address } = request.body;
    const result = await requestAccountBalance(address);
    response.json({address, ...result});
});

module.exports = router