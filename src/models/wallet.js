const connection = require("../config/db");

const postWallet = (dataWallet) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO wallet set ?", dataWallet, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const getWallet = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT wallet.id, wallet.user_id, users.name, wallet.balance  from wallet JOIN users ON wallet.user_id = users.id;", (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const updateWallet = (dataWallet, id) => {
  return new Promise((resolve, reject) => {
    connection.query("UPDATE wallet set ? WHERE id = ?", [dataWallet, id], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const getDetailedWallet = (id) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM wallet WHERE id = ?", id, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

module.exports = {
  postWallet,
  getWallet,
  updateWallet,
  getDetailedWallet
};
