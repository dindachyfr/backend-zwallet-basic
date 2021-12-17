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
        res.json({result: result})
        }catch (error) {
            const errorRes = new Error('Internal Server Error')
            errorRes.status = 500
            console.log(error)
            next(errorRes)
          }
}

const getTransaction = async (req,res,next) =>{
    try{
        const result = await modelTransaction.getTransaction()
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
        res.json({result: result})
    }catch (error) {
        const errorRes = new Error('Internal Server Error')
        errorRes.status = 500
        console.log(error)
        next(errorRes)
      }

}


const getTransactionHistory = async (req,res,next)=>{
    try{
        const id = req.params.sender_wallet_id
        const result = await modelTransaction.getTransactionHistory(id)
        commonHelper.reponse(res, result, 200)
    }catch(error){
        const errorRes = new Error('Internal Server Error')
        errorRes.status = 500
        console.log(error)
        next(errorRes)
    }
}

const getTransactionSorted = async (req,res,next) =>{
    try{
        const sort = req.query.sort || 'date'
        const order = req.query.order || 'DESC'
        const result = await modelTransaction.getTransactionSorted({sort: sort, order: order})
        commonHelper.reponse(res, result, 200)
    }catch (error) {
        const errorRes = new Error('Internal Server Error')
        errorRes.status = 500
        console.log(error)
        next(errorRes)
      }

}


module.exports = {
    postTransaction: postTransaction,
    getTransaction: getTransaction,
    delTransaction: delTransaction,
    getTransactionSorted: getTransactionSorted,
    getTransactionHistory: getTransactionHistory
}