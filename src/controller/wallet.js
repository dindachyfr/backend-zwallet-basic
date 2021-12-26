const { listen } = require('express/lib/application');
const mysql = require('mysql2');
const connection = require('../config/db')
const modelWallet = require('../models/wallet')
const commonHelper = require('../helper/common')

const postWallet = async (req, res, next)=>{
    try{
        const {user_id, balance} = req.body
        const dataWallet = {
            user_id: user_id,
            balance: balance
        }
        const result = await modelWallet.postWallet(dataWallet)
        res.json({result: result})
    }
    catch (error) {
        const errorRes = new Error('Internal Server Error')
        errorRes.status = 500
        console.log(error)
        next(errorRes)
      }
}

const getWallet = async (req,res,next)=>{
    try{
        const result = await modelWallet.getWallet()
        commonHelper.reponse(res, result, 200)
    }catch (error) {
        const errorRes = new Error('Internal Server Error')
        errorRes.status = 500
        console.log(error)
        next(errorRes)
      }
}

const updateWallet = async (req,res,next)=>{  //currently update by wallet_id
    try{
        const id = req.params.id
        const {balance} = req.body
        const dataWallet = {
            balance: balance,
        }        
            const result = await modelWallet.updateWallet(dataWallet, id)
            res.json({result: result})
            }catch (error) {
                const errorRes = new Error('Internal Server Error')
                errorRes.status = 500
                console.log(error)
                next(errorRes)
                      }
}

const getDetailedWallet = async (req, res, next) =>{
    try{
        const id = req.params.id
        const result = await modelWallet.getDetailedWallet(id)

        commonHelper.reponse(res, result, 200)
        }
        catch (error) {
            const errorRes = new Error('Internal Server Error')
            errorRes.status = 500
            console.log(error)
            next(errorRes)
              }
}

module.exports = {
    postWallet: postWallet,
    getWallet:getWallet,
    updateWallet: updateWallet,
    getDetailedWallet: getDetailedWallet
}
