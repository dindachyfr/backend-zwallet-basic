// npm  install mysql2
// npm install express
// npm install nodemon -D
// npm install morgan        ==>buat mempermudah debugging
// npm install dotenv
// npm install bcrypt    ==>buat password hashing

require("dotenv").config();
const express = require("express");
const app = express();
const userRoute = require("./src/route/user");
const walletRoute = require("./src/route/wallet");
const transactionRoute = require("./src/route/transaction");
const helper = require("./src/helper/common");
const morgan = require("morgan");
const cors = require("cors");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});

app.use(cors());
// middlewear to access json data
app.use(express.json());

// memermudah debugging
app.use(morgan("dev"));

// handle data user
app.use("/users", userRoute);

// handle data wallet
app.use("/user-wallet", walletRoute);

// handle data transaction
app.use("/transaction", transactionRoute);

// handle typo in writing path
app.use(helper.handleNotFound);

// handle error

app.use((err, req, res) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode);
  res.json({
    status: statusCode,
    message: message
  });
});
