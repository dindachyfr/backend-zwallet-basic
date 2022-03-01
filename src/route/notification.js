const express = require("express");
const notificationController = require("../controller/notification");
const { protect } = require("../middleware/authentication");
const middleware = require("../middleware/midware");
const upload = require("../middleware/uploadFile");
const route = express.Router();

route
  .get("/", notificationController.getInfoNotification)
  .post("/", protect, upload.single("image"), middleware.midNotification, notificationController.postNotification);

module.exports = route;
