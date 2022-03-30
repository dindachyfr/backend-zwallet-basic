const express = require("express");
const userController = require("../controller/user");
const { protect, tokenSignUp } = require("../middleware/authentication");
const middleware = require("../middleware/midware");
const upload = require("../middleware/uploadFile");

const route = express.Router();

route
  .get("/", protect, userController.getUsersFiltered)
  .delete("/:id", protect, userController.delUser) // admin only
  .put("/pin/:id", userController.updatePinUser) // del redis redisMidware.delProfileRedis,
  .put("/phone/:id", userController.updatePhoneUser) // del redis redisMidware.delProfileRedis
  .put("/password/:id", userController.updateUser)
  .put("/profile-picture/:id", upload.single("profile_picture"), userController.updatePPUser) // del redis redisMidware.delProfileRedis
  .post("/register", middleware.midUser, userController.registerUser)
  .post("/login", userController.loginUser) // del redis redisMidware.delProfileRedis
  .get("/:id", userController.getUserByID) // ganti endpoint because meresahkan warga, get user by id kgk jalan
  .post("/pinconfirm/:id", userController.pinConfirm)
  .get("/user/profile", protect, userController.getProfile) // profile redis redisMidware.hitCacheProfile
  .get("/account-verification/:token", tokenSignUp, userController.updateUserStatus);

module.exports = route;
