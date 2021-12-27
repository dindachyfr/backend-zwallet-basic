const express = require("express");
const transactionController = require("../controller/transaction");
const transferController = require("../controller/transfer");
const middleware = require("../middleware/midware");
const route = express.Router();

route
  .post("/", transactionController.postTransaction)
  .get("/", transactionController.getTransaction)
  .get("/history/:sender_wallet_id", transactionController.getTransactionHistory)
  .delete("/:id", transactionController.delTransaction)
  .put("/transfer/confirm/:sender_wallet_id/:id", transferController.confirmTransfer)
  .delete("/transfer/cancel/:id", transferController.cancelTransfer)
  .post("/transfer", middleware.midTransfer, transferController.transfer);

module.exports = route;
