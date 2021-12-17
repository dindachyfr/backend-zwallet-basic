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

const getTransactionSorted = ({sort, order}) =>{

    return new Promise ((resolve,reject)=>{
        connection.query(`SELECT transaction.sender_wallet_id, transaction.receiver_wallet_id, users.name as receiver, users.phone_number,transaction.amount, transaction.date, transaction.notes,wallet.balance FROM transaction JOIN wallet ON (wallet.id = transaction.receiver_wallet_id) JOIN users ON (users.id = wallet.user_id) ORDER BY ${sort} ${order}`, (error, result)=>{
            if(!error){
            resolve(result)
        }else{
            reject(error)
        }        
        })
     })
}

const getTransaction = () =>{

    return new Promise ((resolve,reject)=>{
        connection.query(`SELECT transaction.sender_wallet_id, transaction.receiver_wallet_id, users.name as receiver, users.phone_number,transaction.amount, transaction.date, transaction.notes,wallet.balance FROM transaction JOIN wallet ON (wallet.id = transaction.receiver_wallet_id) JOIN users ON (users.id = wallet.user_id)`, (error, result)=>{
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

const getTransactionHistory = (id)=>{
    return new Promise((resolve, reject)=>{
        connection.query ("SELECT transaction.receiver_wallet_id, users.name as receiver, users.phone_number,transaction.amount, transaction.date, transaction.notes,wallet.balance FROM transaction JOIN wallet ON (wallet.id = transaction.receiver_wallet_id) JOIN users ON (users.id = wallet.user_id) WHERE transaction.sender_wallet_id = ?", id, (error, result)=>{
            if(!error){
                resolve(result)
            }else{
                reject(error)
            }   
      
        })
    })
}

module.exports = {
    postTransaction, getTransaction,
    delTransaction, getTransactionHistory,
    getTransactionSorted
}