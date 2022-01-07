/* eslint-disable quotes */
const connection = require("../config/db");

const countUsers = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT COUNT (*) AS total FROM users", (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const getUsersFiltered = ({ filter, limit, offset }) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT users.id, users.name, users.phone_number, users.email, wallet.id AS wallet_id, wallet.balance FROM users JOIN wallet ON (wallet.user_id = users.id) WHERE name LIKE '%${filter}%' LIMIT ${limit} OFFSET ${offset}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const getUserByID = (id) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT users.id, users.name, users.phone_number, users.email, wallet.id AS wallet_id, wallet.balance FROM users JOIN wallet ON (wallet.user_id = users.id) WHERE users.id = ?", id, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const postUser = (dataUser) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO users set ?", dataUser, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const delUser = (id) => {
  return new Promise((resolve, reject) => {
    connection.query("DELETE FROM users WHERE id = ?", id, (error, result) => {
      if (!error) { resolve(result); } else { reject(error); }
    });
  });
};

const updateUser = (dataUser, id) => {
  return new Promise((resolve, reject) => {
    connection.query("UPDATE users SET ? WHERE id = ?", [dataUser, id], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM users WHERE email = ?", email, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const userDisplay = (email) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT users.id, users.name, users.phone_number, users.email, wallet.id AS wallet_id, wallet.balance FROM users JOIN wallet ON (wallet.user_id = users.id) WHERE email = ?", email, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const createAccount = (data) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO users SET ?", data, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

module.exports = {
  postUser: postUser,
  delUser: delUser,
  updateUser: updateUser,
  getUsersFiltered: getUsersFiltered,
  countUsers: countUsers,
  findByEmail: findByEmail,
  createAccount: createAccount,
  userDisplay: userDisplay,
  getUserByID: getUserByID
};
