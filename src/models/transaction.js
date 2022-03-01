/* eslint-disable camelcase */
const connection = require("../config/db");

const postTransaction = (dataTransaction) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO transaction set ?", dataTransaction, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const getTransaction = ({ sort, order, limit, offset }) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT transaction.transaction_id as record_no, transaction.sender_wallet_id, transaction.receiver_wallet_id, users.name as receiver, users.phone_number,transaction.amount, transaction.date, transaction.notes FROM transaction JOIN wallet ON (wallet.id = transaction.receiver_wallet_id) JOIN users ON (users.id = wallet.user_id) ORDER BY ${sort} ${order} LIMIT ${limit} OFFSET ${offset}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const delTransaction = (id) => {
  return new Promise((resolve, reject) => {
    connection.query("DELETE FROM transaction WHERE transaction_id = ?", id, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const getTransactionHistory = ({ id, sort, limit, offset, order }) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT transaction.transaction_id as record_no, transaction.sender_wallet_id, transaction.receiver_wallet_id, users.name as receiver, users.phone_number,transaction.amount, transaction.date, transaction.notes FROM transaction JOIN wallet ON (wallet.id = transaction.receiver_wallet_id) JOIN users ON (users.id = wallet.user_id) WHERE transaction.sender_wallet_id = ${id} ORDER BY ${sort} ${order} LIMIT ${limit} OFFSET ${offset}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const countTransctions = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT COUNT (*) AS total FROM transaction", (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const countTransctionsBySenderID = (id) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT COUNT (*) AS total FROM transaction WHERE sender_wallet_id = ?", id, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const getTransactionRecord = (id_transaction) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT transaction.transaction_id as record_no, transaction.sender_wallet_id, transaction.receiver_wallet_id, u2.name as sender, u1.name as receiver, u1.phone_number,transaction.amount, transaction.date, transaction.notes FROM transaction JOIN wallet w1 ON (w1.id = transaction.receiver_wallet_id) JOIN users u1 ON (u1.id = w1.user_id) JOIN wallet w2 ON (w2.id = transaction.sender_wallet_id) JOIN users u2 ON (u2.id = w2.user_id) WHERE transaction.transaction_id = ?", id_transaction, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const getExpense = (id) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT sender_wallet_id, SUM(amount) as amount FROM transaction WHERE sender_wallet_id = ?", id, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const getIncome = (id) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT receiver_wallet_id, SUM(amount) as amount FROM transaction WHERE receiver_wallet_id = ?", id, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const getNotification = ({ id, sort, limit, offset, order }) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT transaction.transaction_id as record_no, transaction.sender_wallet_id, transaction.receiver_wallet_id, u2.name as sender, u1.name as receiver, u1.phone_number,transaction.amount, transaction.date, transaction.notes FROM transaction JOIN wallet w1 ON (w1.id = transaction.receiver_wallet_id) JOIN users u1 ON (u1.id = w1.user_id) JOIN wallet w2 ON (w2.id = transaction.sender_wallet_id) JOIN users u2 ON (u2.id = w2.user_id) WHERE transaction.sender_wallet_id = ${id} OR transaction.receiver_wallet_id = ${id} ORDER BY ${sort} ${order} LIMIT ${limit} OFFSET ${offset}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const countNotificationByID = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT COUNT (*) AS total FROM transaction WHERE sender_wallet_id = ? or receiver_wallet_id = ${id}`, id, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

module.exports = {
  postTransaction,
  delTransaction,
  getTransactionHistory,
  getTransaction,
  countTransctions,
  countTransctionsBySenderID,
  getTransactionRecord,
  getExpense,
  getIncome,
  getNotification,
  countNotificationByID
};
