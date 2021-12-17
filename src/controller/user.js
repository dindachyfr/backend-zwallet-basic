const { listen } = require('express/lib/application');
const mysql = require('mysql2');
const connection = require('../config/db')
const modelUsers = require('../models/user')
const commonHelper = require('../helper/common')

const getUsers =  async (req, res, next)=>{
    try {
        const result = await modelUsers.getUsers()
        commonHelper.reponse(res, result, 200)
      } catch (error) {
        const errorRes = new Error('Internal Server Error')
        errorRes.status = 500
        console.log(error)
        next(errorRes)
      }
}

const getUsersFiltered =  async (req, res, next)=>{
  try {
      const filter = req.query.filter
      const result = await modelUsers.getUsersFiltered(filter)
      commonHelper.reponse(res, result, 200)
    } catch (error) {
      const errorRes = new Error('Internal Server Error')
      errorRes.status = 500
      console.log(error)
      next(errorRes)
    }
}


const postUser = async (req, res, next)=>{

    try{
        const {name, phone_number, username, email, password, pin} = req.body
        const dataUser = {
            name: name, 
            phone_number: phone_number,
            username: username,
            email: email,
            password: password,
            pin: pin
        }
        const result = await modelUsers.postUser(dataUser)
        res.json({
          result: result
        })        
        }
        catch (error) {
          const errorRes = new Error('Internal Server Error')
          errorRes.status = 500
          console.log(error)
          next(errorRes)
          }
}

const delUser = async (req, res, next) =>{

    try{
        const id = req.params.id

        const result = await modelUsers.delUser(id)
        res.json({
            result: result
        })
        }

    catch (error) {

      const errorRes = new Error('Internal Server Error')
      errorRes.status = 500
      console.log(error)
      next(errorRes)
          }
}

const updateUser = async (req, res, next)=>{
    try{
        const id = req.params.id
        const {name, phone_number, username, email, password, pin} = req.body
        const dataUser = {
            name: name, 
            phone_number: phone_number,
            username: username,
            email: email,
            password: password,
            pin: pin
        }
        const result = await modelUsers.updateUser(dataUser, id)
        res.json({result: result})
        }
        catch (error) {

          const errorRes = new Error('Internal Server Error')
          errorRes.status = 500
          console.log(error)
          next(errorRes)
          }
}

module.exports = {
    getUsers: getUsers,
    postUser: postUser,
    delUser: delUser,
    updateUser: updateUser,
    getUsersFiltered: getUsersFiltered
}