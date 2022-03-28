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
const notifRoute = require("./src/route/notification");
const helper = require("./src/helper/common");
const morgan = require("morgan");
const cors = require("cors");

// config socket
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server({
  cors: { origin: ["http://localhost:3000", "https://zwallet-dindin.netlify.app"] }
});

io.on("connection", (socket) => {
  console.log("some user ONLINE");
  // join room
  socket.on("wallet ID", (UID) => {
    socket.join(UID);
    console.log(UID);
  });
  // notif global
  socket.on("notif admin", (notification) => {
    io.emit("notif admin", notification);
    console.log(notification);
  });
  // notif transfer
  socket.on("notif transaksi", (receipt) => {
    socket.to(receipt.receiver).emit("notif transaksi", receipt);
    console.log(receipt);
  });
  socket.on("disconnect", () => {
    console.log("some user OFFLINE");
  });
});

io.listen(server);

// end of config socket

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
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

// handle data transaction
app.use("/notification", notifRoute);

// handle link to profile_picture
// kalo ga pake ginian nanti link profile_picture will be redirected to handleNotFound
app.use("/file", express.static("./uploads"));

// handle typo in writing path
app.use(helper.handleNotFound);

// handle error

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode);
  res.json({
    status: statusCode,
    message: message
  });
});
