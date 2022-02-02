/* eslint-disable camelcase */
const modelTransaction = require("../models/transaction");
const modelWallet = require("../models/wallet");
const commonHelper = require("../helper/common");
const modelUser = require("../models/user");

const transfer = async (req, res, next) => { // .post('/transfer'
  try {
    const { sender_wallet_id, receiver_wallet_id, amount, notes } = req.body;

    const dataTransfer = { sender_wallet_id, receiver_wallet_id, amount, notes };
    const postTransfer = await modelTransaction.postTransaction(dataTransfer);
    commonHelper.reponse(res, postTransfer, 201, "Please confirm your transaction");
  } catch (error) {
    const errorRes = new Error("Internal Server Error");
    errorRes.status = 500;
    console.log(error);
    next(errorRes);
  }
};

const confirmTransfer = async (req, res, next) => { // .put('/transfer/confirm/userID/:sender_wallet_id/transaction_id'
  try {
    const { pin } = req.body;
    const userID = req.params.id;
    const id_transaction = req.params.transaction_id; // tampilin di getTransaction
    const id = req.params.sender_wallet_id;
    const checkUserData = await modelUser.getUserByID(userID);
    const userPIN = checkUserData[0].pin;
    const checkSenderWallet = await modelWallet.getDetailedWallet(id);
    const senderBalance = checkSenderWallet[0].balance;
    const getTransactionRecord = await modelTransaction.getTransactionRecord(id_transaction);// buat get transaction where id = record_no;
    const amount = getTransactionRecord[0].amount;
    const receiver_wallet_id = getTransactionRecord[0].receiver_wallet_id;
    const checkReceiverWallet = await modelWallet.getDetailedWallet(receiver_wallet_id);
    const receiverBalance = checkReceiverWallet[0].balance;
    if (pin === userPIN) {
      const dataWalletSender = { balance: senderBalance - amount };
      const dataWalletReceiver = { balance: receiverBalance + amount };

      const updateWalletSender = await modelWallet.updateWallet(dataWalletSender, id);
      const updateWalletReceiver = await modelWallet.updateWallet(dataWalletReceiver, receiver_wallet_id);
      commonHelper.reponse(res, [updateWalletSender, updateWalletReceiver], 201, "Transaction succeeded");
    } else {
      const errorRes = new Error("You entered the wrong PIN!");
      errorRes.status = 403;
      next(errorRes);
    }
  } catch (error) {
    const errorRes = new Error("Internal Server Error");
    errorRes.status = 500;
    console.log(error);
    next(errorRes);
  }
};

const cancelTransfer = async (req, res, next) => { // .delete('/transfer/cancel/:id)
  try {
    const record_no = req.params.transaction_id;
    const result = await modelTransaction.delTransaction(record_no);// buat delete from transaction where id = record_no
    commonHelper.reponse(res, result, 200, "Transaction canceled");
  } catch (error) {
    const errorRes = new Error("Internal Server Error");
    errorRes.status = 500;
    console.log(error);
    next(errorRes);
  }
};

module.exports = { transfer, confirmTransfer, cancelTransfer };
