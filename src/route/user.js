const express = require("express");
const userController = require("../controller/user");
const middleware = require("../middleware/midware");

const route = express.Router();

route
  .post("/", userController.postUser)
  .get("/", userController.getUsersFiltered)
  .delete("/:id", userController.delUser)
  .put("/pin/:id", userController.updatePinUser)
  .put("/:id", userController.updateUser)
  .post("/register", middleware.midUser, userController.registerUser)
  .post("/login", userController.loginUser)
  .get("/:id", userController.getUserByID);

module.exports = route;
