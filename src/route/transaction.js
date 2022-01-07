const express = require("express");
const transactionController = require("../controller/transaction");
const transferController = require("../controller/transfer");
const middleware = require("../middleware/midware");
const route = express.Router();

route
  .get("/", transactionController.getTransaction)
  .get("/:id", transactionController.getTransactionRecord)
  .get("/history/:sender_wallet_id", transactionController.getTransactionHistory)
  .put("/transfer/confirm/:sender_wallet_id/:id", transferController.confirmTransfer)
  .delete("/transfer/cancel/:id", transferController.cancelTransfer)
  .post("/transfer", middleware.midTransfer, transferController.transfer);

module.exports = route;
