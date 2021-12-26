const express = require("express");
const walletController = require("../controller/wallet");
const middleware = require("../middleware/midware");
const route = express.Router();

route
  .post("/", middleware.midWallet, walletController.postWallet)
  .get("/", walletController.getWallet)
  .get("/:id", walletController.getDetailedWallet)
  .put("/:id", walletController.updateWallet);

module.exports = route;
