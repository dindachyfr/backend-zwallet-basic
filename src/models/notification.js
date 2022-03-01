const connection = require("../config/db");

const postNotification = (dataNotification) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO notification SET ?", dataNotification, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const getInfoNotification = ({ sort, order, limit, offset }) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM notification ORDER BY ${sort} ${order} LIMIT ${limit} OFFSET ${offset}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const countInfoNotification = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT COUNT (*) AS total FROM notification", (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

module.exports = {
  postNotification,
  getInfoNotification,
  countInfoNotification
};
