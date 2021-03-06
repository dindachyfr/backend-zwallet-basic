/* eslint-disable no-undef */
/* eslint-disable camelcase */
const modelWallet = require("../models/wallet");

const midTransfer = async (req, res, next) => {
  try {
    const { sender_wallet_id, amount } = req.body; // masuk ke middleware buat cek saldo>amount
    const checkSenderWallet = await modelWallet.getDetailedWallet(sender_wallet_id); // masuk ke middleware buat cek saldo>amount
    const senderBalance = checkSenderWallet[0].balance; // masuk ke middleware buat cek saldo>amount

    if (senderBalance > amount) { next(); } else {
      const errorRes = new Error("The transfer amount is exceeding your current balance");
      errorRes.status = 500;
      next(errorRes);
    }
  } catch (error) {
    const errorRes = new Error("Internal Server Error");
    errorRes.status = 500;
    console.log(error);
    next(errorRes);
  }
};

const midWallet = async (req, res, next) => {
  try {
    // eslint-disable-next-line camelcase
    const { balance, user_id } = req.body;
    if (!balance || !user_id) {
      const errorRes = new Error("Please insert balance or user_id properly");
      errorRes.status = 500;
      next(errorRes);
    } else { next(); }
  } catch (error) {
    const errorRes = new Error("Internal Server Error");
    errorRes.status = 500;
    console.log(error);
    next(errorRes);
  }
};

midUser = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    const errorRes = new Error("Please fill in all forms!");
    errorRes.status = 403;
    next(errorRes);
  } else { next(); }
};

midNotification = (req, res, next) => {
  const { title } = req.body;
  if (!title) {
    const errorRes = new Error("Please fill in title form!");
    errorRes.status = 500;
    next(errorRes);
  } else { next(); }
};

module.exports = { midTransfer, midWallet, midUser, midNotification };
