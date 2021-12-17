const express = require('express')
const walletController = require('../controller/wallet')

const route = express.Router()

route
  .post('/', walletController.postWallet)
   .get('/', walletController.getWallet)
   .get('/:id', walletController.getDetailedWallet)
   .put('/:id', walletController.updateWallet)
  
module.exports = route