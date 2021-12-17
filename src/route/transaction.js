const express = require('express')
const transactionController = require('../controller/transaction')

const route = express.Router()

route.
    post('/', transactionController.postTransaction)
    .get('/', transactionController.getTransaction)
    .get('/sort', transactionController.getTransactionSorted)
    .get('/history/:sender_wallet_id', transactionController.getTransactionHistory)
    .delete('/:id', transactionController.delTransaction)

module.exports = route