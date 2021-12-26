const { off } = require('../config/db')
const connection = require('../config/db')

const postTransaction = (dataTransaction)=>{
    return new Promise ((resolve,reject)=>{
        connection.query("INSERT INTO transaction set ?", dataTransaction, (error, result)=>{
            if(!error){
                resolve(result)
            }else{
                reject(error)
            }
        })
    })
}

const getTransaction = ({sort, order, limit, offset}) =>{

    return new Promise ((resolve,reject)=>{
        connection.query(`SELECT transaction.id as record_no, transaction.sender_wallet_id, transaction.receiver_wallet_id, users.name as receiver, users.phone_number,transaction.amount, transaction.date, transaction.notes FROM transaction JOIN wallet ON (wallet.id = transaction.receiver_wallet_id) JOIN users ON (users.id = wallet.user_id) ORDER BY ${sort} ${order} LIMIT ${limit} OFFSET ${offset}`, (error, result)=>{
            if(!error){
            resolve(result)
        }else{
            reject(error)
        }        
        })
     })
}

const delTransaction = (id)=>{
    return new Promise((resolve,reject)=>{
        connection.query("DELETE FROM transaction WHERE id = ?", id, (error, result)=>{
        if(!error){
            resolve(result)
        }else{
            reject(error)
        }   
        })
    })
}

const getTransactionHistory = ({id, sort, limit, offset})=>{
    return new Promise((resolve, reject)=>{
        connection.query ("SELECT transaction.receiver_wallet_id, users.name as receiver, users.phone_number,transaction.amount, transaction.date, transaction.notes FROM transaction JOIN wallet ON (wallet.id = transaction.receiver_wallet_id) JOIN users ON (users.id = wallet.user_id) WHERE transaction.sender_wallet_id = ? ORDER BY ?? LIMIT ? OFFSET ?", [id, sort, limit, offset], (error, result)=>{
            if(!error){
                resolve(result)
            }else{
                reject(error)
            }   
      
        })
    })
}

const countTransctions = () =>{
    return new Promise((resolve, reject)=>{
        connection.query("SELECT COUNT (*) AS total FROM transaction", (error,result)=>{
          if(!error){
            resolve(result)
          }else{
            reject(error)
          }
        })
      })
    }

    const countTransctionsBySenderID = (id) =>{
        return new Promise((resolve, reject)=>{
            connection.query("SELECT COUNT (*) AS total FROM transaction WHERE sender_wallet_id = ?",id, (error,result)=>{
              if(!error){
                resolve(result)
              }else{
                reject(error)
              }
            })
          })
        }

const getTransactionRecord = (id_transaction) =>{
    return new Promise((resolve, reject)=>{
        connection.query ("SELECT transaction.receiver_wallet_id, users.name as receiver, users.phone_number,transaction.amount, transaction.date, transaction.notes FROM transaction JOIN wallet ON (wallet.id = transaction.receiver_wallet_id) JOIN users ON (users.id = wallet.user_id) WHERE transaction.id = ?", id_transaction, (error, result)=>{
            if(!error){
                resolve(result)
            }else{
                reject(error)
            }   
      
        })
    })
}
    

module.exports = {
    postTransaction,
    delTransaction, getTransactionHistory,
    getTransaction, countTransctions,
    countTransctionsBySenderID, getTransactionRecord
}