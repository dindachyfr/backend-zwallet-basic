const { listen } = require('express/lib/application');
const mysql = require('mysql2');
const connection = require('../config/db')
const modelTransaction = require('../models/transaction')
const commonHelper = require('../helper/common')

const postTransaction = async (req, res, next)=>{
    try{
        const {sender_wallet_id, receiver_wallet_id, amount, notes} = req.body
        const dataTransaction = {
            sender_wallet_id: sender_wallet_id,
            receiver_wallet_id: receiver_wallet_id,
            amount: amount,
            notes: notes
            }
        const result = await modelTransaction.postTransaction(dataTransaction)
        commonHelper.reponse(res, result, 200)
        }catch (error) {
            const errorRes = new Error('Internal Server Error')
            errorRes.status = 500
            console.log(error)
            next(errorRes)
          }
}

const delTransaction = async (req,res,next) =>{
    try{
        const id = req.params.id
        result = await modelTransaction.delTransaction(id)
        commonHelper.reponse(res, result, 200)
    }catch (error) {
        const errorRes = new Error('Internal Server Error')
        errorRes.status = 500
        console.log(error)
        next(errorRes)
      }

}


const getTransactionHistory = async (req,res,next)=>{
    try{
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 2
        const offset = (page-1) * limit
        const sort = req.query.sort || 'date'
        const id = req.params.sender_wallet_id
        const result = await modelTransaction.getTransactionHistory({id, sort, limit, offset})
        const resultCount = await modelTransaction.countTransctionsBySenderID(id)
        const { total } = resultCount[0]
        commonHelper.reponse(res, result, 200, null, {currentPage: page,
            limit: limit,
            totalData: total,
            totalPage: Math.ceil(total / limit)
          })
    }catch(error){
        const errorRes = new Error('Internal Server Error')
        errorRes.status = 500
        console.log(error)
        next(errorRes)
    }
}

const getTransaction = async (req,res,next) =>{
    try{
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 2
        const offset = (page-1) * limit
        const sort = req.query.sort || 'date'
        const order = req.query.order || 'DESC'
        const result = await modelTransaction.getTransaction({sort, order, limit, offset})
        const resultCount = await modelTransaction.countTransctions()
        const { total } = resultCount[0]
          console.log(total);
        
          commonHelper.reponse(res, result, 200, null, {currentPage: page,
            limit: limit,
            totalData: total,
            totalPage: Math.ceil(total / limit)
          })
      }catch (error) {
        const errorRes = new Error('Internal Server Error')
        errorRes.status = 500
        console.log(error)
        next(errorRes)
      }

}


module.exports = {
    postTransaction: postTransaction,
    delTransaction: delTransaction,
    getTransaction: getTransaction,
    getTransactionHistory: getTransactionHistory
}