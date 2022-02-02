/* eslint-disable camelcase */
const modelUsers = require("../models/user");
const modelWallet = require("../models/wallet");
const commonHelper = require("../helper/common");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getUsersFiltered = async (req, res, next) => {
  try {
    console.log("yiha");
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const offset = (page - 1) * limit;
    const filter = req.query.filter || "";
    const result = await modelUsers.getUsersFiltered({ filter, limit, offset });
    const resultCount = await modelUsers.countUsers();
    const { total } = resultCount[0];
    console.log(total);
    commonHelper.reponse(res, result, 200, null, {
      currentPage: page,
      limit: limit,
      totalData: total,
      totalPage: Math.ceil(total / limit)
    });
  } catch (error) {
    const errorRes = new Error("Internal Server Error");
    errorRes.status = 500;
    console.log(error);
    next(errorRes);
  }
};

const postUser = async (req, res, next) => {
  try {
    const { name, phone_number, username, email, password, pin } = req.body;
    const dataUser = {
      name: name,
      phone_number: phone_number,
      username: username,
      email: email,
      password: password,
      pin: pin
    };
    const result = await modelUsers.postUser(dataUser);
    // eslint-disable-next-line no-unused-vars
    commonHelper.reponse(res, result, 200);
  } catch (error) {
    const errorRes = new Error("Internal Server Error");
    errorRes.status = 500;
    console.log(error);
    next(errorRes);
  }
};

const delUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const role = req.role;
    if (role === "admin") {
      const result = await modelUsers.delUser(id);
      commonHelper.reponse(res, result, 200);
    } else {
      const errorRes = new Error("You are not authorized!");
      errorRes.status = 500;
      next(errorRes);
    }
  } catch (error) {
    const errorRes = new Error("Internal Server Error");
    errorRes.status = 500;
    console.log(error);
    next(errorRes);
  }
};

const updatePinUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    // const { name, phone_number, username, email, password, pin } = req.body;
    const { pin } = req.body;
    // const passwordHashed = await bcrypt.hash(password, 10);
    // const dataUser = {
    //   name: name,
    //   phone_number: phone_number,
    //   username: username,
    //   email: email,
    //   password: passwordHashed,
    //   pin: pin
    // };
    const dataUser = {
      pin: pin
    };

    const result = await modelUsers.updateUser(dataUser, id);
    commonHelper.reponse(res, result, 200, "Profile has been successfully updated");
  } catch (error) {
    const errorRes = new Error("Internal Server Error");
    errorRes.status = 500;
    console.log(error);
    next(errorRes);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, phone_number, username, email, password, pin } = req.body;
    // const { pin } = req.body;
    const passwordHashed = await bcrypt.hash(password, 10);
    const dataUser = {
      name: name,
      phone_number: phone_number,
      username: username,
      email: email,
      password: passwordHashed,
      pin: pin
    };
    // const dataUser = {
    //   pin: pin
    // };

    const result = await modelUsers.updateUser(dataUser, id);
    commonHelper.reponse(res, result, 200, "Profile has been successfully updated");
  } catch (error) {
    const errorRes = new Error("Internal Server Error");
    errorRes.status = 500;
    console.log(error);
    next(errorRes);
  }
};

const updatePPUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const fileName = req.file.filename; // `${req.get("host")} kalo mau dinamis
    const dataUser = {
      profile_picture: `http://localhost:5000/file/${fileName}`
    };
    // const dataUser = {
    //   pin: pin
    // };

    const result = await modelUsers.updateUser(dataUser, id);
    commonHelper.reponse(res, [dataUser, result], 200, "Profile has been successfully updated");
  } catch (error) {
    const errorRes = new Error("Internal Server Error");
    errorRes.status = 500;
    console.log(error);
    next(errorRes);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const emailavailablitiy = await modelUsers.findByEmail(email);

    if (emailavailablitiy.length > 0) {
      const errorRes = new Error("Email already exist!");
      errorRes.status = 403;
      next(errorRes);
    } else {
      const passwordHashed = await bcrypt.hash(password, 10);
      const data = {
        name,
        email,
        password: passwordHashed
      };
      const accountCreated = await modelUsers.createAccount(data);
      const secretKey = process.env.SECRET_KEY;
      const payload = {
        email: data.email,
        id: accountCreated.insertId
      };
      const tokenExpiration = {
        expiresIn: 60 * 60
      };
      const token = jwt.sign(payload, secretKey, tokenExpiration);

      const dataWallet = { user_id: accountCreated.insertId, balance: 0 };
      // eslint-disable-next-line no-unused-vars
      const resultWallet = await modelWallet.postWallet(dataWallet);
      commonHelper.sendEmail(token, email);
      commonHelper.reponse(res, [accountCreated, token], 201, "Please kindly check your email for verification");
    }
  } catch (error) {
    const errorRes = new Error("Internal Server Error");
    errorRes.status = 500;
    console.log(error);
    next(errorRes);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const email = req.email;
    const result = await modelUsers.userDisplay(email);
    commonHelper.reponse(res, result, 200, null);
  } catch (error) {
    const errorRes = new Error("Internal Server Error");
    errorRes.status = 500;
    console.log(error);
    next(errorRes);
  }
};

const updateUserStatus = async (req, res, next) => {
  try {
    const id = req.id;
    const dataUser = {
      status: "active"
    };
    const result = await modelUsers.updateUserStatus(dataUser, id);
    commonHelper.reponse(res, [dataUser, result], 200, "Your account has been successfully activated");
    // res.redirect("http://localhost:3000/login"); // buat di frontend nanti
  } catch (error) {
    const errorRes = new Error("Internal Server Error");
    errorRes.status = 500;
    console.log(error);
    next(errorRes);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const [user] = await modelUsers.findByEmail(email);
    const [userDisplay] = await modelUsers.userDisplay(email);
    console.log(user);

    const passwordMatches = await bcrypt.compare(password, user.password);
    console.log(password);
    console.log(user.password);
    console.log(passwordMatches);
    if (!passwordMatches) {
      const errorRes = new Error("You entered the wrong email / password!");
      errorRes.status = 403;
      return next(errorRes);
    } else if (passwordMatches && user.status === "active") {
      const secretKey = process.env.SECRET_KEY;
      const payload = {
        email: user.email,
        name: user.name,
        role: user.role
      };
      // console.log(payload);
      const tokenExpiration = {
        expiresIn: 60 * 60
      };
      const token = jwt.sign(payload, secretKey, tokenExpiration);
      userDisplay.token = token;
      commonHelper.reponse(res, [userDisplay, token], 200, "Login Success");
    } else if (passwordMatches && user.status !== "active") {
      const errorRes = new Error("Please activate your account first!");
      errorRes.status = 403;
      return next(errorRes);
    }
  } catch (error) {
    const errorRes = new Error("Internal Server Error");
    errorRes.status = 500;
    console.log(error);
    next(errorRes);
  }
};

const getUserByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await modelUsers.getUserByID(id);
    commonHelper.reponse(res, result, 200, null);
  } catch (error) {
    const errorRes = new Error("Internal Server Error");
    errorRes.status = 500;
    console.log(error);
    next(errorRes);
  }
};

const pinConfirm = async (req, res, next) => {
  try {
    const { pin } = req.body;
    const id = req.params.id;
    const checkUserPIN = await modelUsers.getUserByID(id);
    console.log(checkUserPIN);
    const userPIN = checkUserPIN[0].pin;
    if (pin === userPIN) {
      commonHelper.reponse(res, (pin === userPIN), 200, "PIN Confirmation Success");
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

const updatePhoneUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    // const { name, phone_number, username, email, password, pin } = req.body;
    const { phone_number } = req.body;
    // const passwordHashed = await bcrypt.hash(password, 10);
    // const dataUser = {
    //   name: name,
    //   phone_number: phone_number,
    //   username: username,
    //   email: email,
    //   password: passwordHashed,
    //   pin: pin
    // };
    const dataUser = {
      phone_number: phone_number
    };

    const result = await modelUsers.updateUser(dataUser, id);
    commonHelper.reponse(res, result, 200, "Profile has been successfully updated");
  } catch (error) {
    const errorRes = new Error("Internal Server Error");
    errorRes.status = 500;
    console.log(error);
    next(errorRes);
  }
};

module.exports = {
  postUser: postUser,
  delUser: delUser,
  updatePinUser: updatePinUser,
  getUsersFiltered: getUsersFiltered,
  registerUser: registerUser,
  loginUser: loginUser,
  getUserByID: getUserByID,
  updateUser: updateUser,
  pinConfirm: pinConfirm,
  updatePhoneUser: updatePhoneUser,
  getProfile: getProfile,
  updatePPUser: updatePPUser,
  updateUserStatus: updateUserStatus
};
