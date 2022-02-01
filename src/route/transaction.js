const express = require("express");
const transactionController = require("../controller/transaction");
const transferController = require("../controller/transfer");
const { protect } = require("../middleware/authentication");
const middleware = require("../middleware/midware");
// eslint-disable-next-line no-unused-vars
const { hitCacheTransactions, delTransactionsRedis } = require("../middleware/redis");
const route = express.Router();

route
  .get("/", hitCacheTransactions, transactionController.getTransaction) // pake redis hitCacheTransactions
  .get("/:transaction_id", transactionController.getTransactionRecord)
  .delete("/transfer/:transaction_id", protect, transactionController.delTransaction) // butuh token
  .get("/history/:sender_wallet_id", transactionController.getTransactionHistory)
  .put("/transfer/confirm/:sender_wallet_id/:transaction_id", delTransactionsRedis, transferController.confirmTransfer) // del redis delTransactionsRedis
  .delete("/transfer/cancel/:id", transferController.cancelTransfer)
  .post("/transfer", middleware.midTransfer, delTransactionsRedis, transferController.transfer) // del redis delTransactionsRedis
  .put("/transfer/confirm/:id/:sender_wallet_id/:transaction_id", delTransactionsRedis, transferController.confirmTransfer); // del redis delTransactionsRedis

module.exports = route;
