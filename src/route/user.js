const express = require('express')
const userController = require('../controller/user')

const route = express.Router()

route
  .post('/', userController.postUser)
  .get('/', userController.getUsers)
  .get('/search', userController.getUsersFiltered)
  .delete('/:id', userController.delUser)
  .put('/:id', userController.updateUser)
  
module.exports = route