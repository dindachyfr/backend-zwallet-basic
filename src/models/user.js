const connection = require('../config/db')
const getUsers = ()=>{
  return new Promise((resolve, reject)=>{
    connection.query("SELECT * FROM users", (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const getUsersFiltered = (filter)=>{
  return new Promise((resolve, reject)=>{
    connection.query(`SELECT * FROM users WHERE name LIKE ` + connection.escape(`%${filter}%`) ,(error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}


const postUser = (dataUser)=>{
    return new Promise((resolve, reject)=>{
        connection.query("INSERT INTO users set ?", dataUser, (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        })
      })
}

const delUser = (id)=>{
    return new Promise((resolve, reject)=>{
        connection.query("DELETE FROM users WHERE id = ?", id, (error, result)=>{
            if(!error){ resolve(result) }
            else { reject(error) }
        })
    })
}

const updateUser = (dataUser, id)=>{
    return new Promise((resolve, reject)=>{
      connection.query("UPDATE users SET ? WHERE id = ?", [dataUser, id], (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
   
  }

module.exports = {
    getUsers: getUsers,
    postUser: postUser,
    delUser: delUser,
    updateUser: updateUser,
    getUsersFiltered: getUsersFiltered
}