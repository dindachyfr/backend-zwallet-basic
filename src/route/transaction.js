const express = require("express");
const transactionController = require("../controller/transaction");
const transferController = require("../controller/transfer");
const { protect } = require("../middleware/authentication");
const middleware = require("../middleware/midware");
const route = express.Router();

route
  .get("/", transactionController.getTransaction) // pake redis hitCacheTransactions
  .get("/:transaction_id", transactionController.getTransactionRecord)
  .delete("/transfer/:transaction_id", protect, transactionController.delTransaction) // butuh token
  .get("/history/:sender_wallet_id", transactionController.getTransactionHistory)
  .put("/transfer/confirm/:sender_wallet_id/:transaction_id", transferController.confirmTransfer) // del redis delTransactionsRedis
  .delete("/transfer/cancel/:transaction_id", transferController.cancelTransfer)
  .post("/transfer", middleware.midTransfer, transferController.transfer) // del redis delTransactionsRedis
  .put("/transfer/confirm/:id/:sender_wallet_id/:transaction_id", transferController.confirmTransfer) // del redis delTransactionsRedis
  .get("transfer/expense/:sender_wallet_id", transactionController.expense)
  .get("transfer/income/:sender_wallet_id", transactionController.income);

module.exports = route;
