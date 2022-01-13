const express = require("express");
const transactionController = require("../controller/transaction");
const transferController = require("../controller/transfer");
const middleware = require("../middleware/midware");
const route = express.Router();

route
  .get("/", transactionController.getTransaction)
  .get("/:transaction_id", transactionController.getTransactionRecord)
  .get("/history/:sender_wallet_id", transactionController.getTransactionHistory)
  .put("/transfer/confirm/:sender_wallet_id/:transaction_id", transferController.confirmTransfer)
  .delete("/transfer/cancel/:id", transferController.cancelTransfer)
  .post("/transfer", middleware.midTransfer, transferController.transfer)
  .put("/transfer/confirm/:id/:sender_wallet_id/:transaction_id", transferController.confirmTransfer);

module.exports = route;
