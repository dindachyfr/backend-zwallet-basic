/* eslint-disable no-undef */
/* eslint-disable node/handle-callback-err */
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;
chai.use(chaiHttp);

const baseGetUnit = (route) => {
  return chai.request("http://localhost:5000").get(`/${route}`);
};

const basePostUnit = (route) => {
  return chai.request("http://localhost:5000").post(`/${route}`);
};

const basePutUnit = (route) => {
  return chai.request("http://localhost:5000").put(`/${route}`);
};

let userID;
let walletID;

describe("GET method in route users", () => {
  const limit = 25;
  it("It should have statusCode = 200", (done) => {
    baseGetUnit("users")
      .query({ limit })
      .end((err, res) => {
        expect(res).to.have.property("statusCode", 200);
        done();
      });
  });

  it("Response should be an array which length is less equal than limit", (done) => {
    baseGetUnit("users")
      .query({ limit })
      .end((err, res) => {
        console.log(res.request.req.path); // get url buat parameter
        expect(res.request.req.path).to.include("limit");
        expect(res.body.data).to.be.a("array").to.have.lengthOf.at.most(limit);
        done();
      });
  });

  it("Get user by ID, response should have property ID same as param", (done) => {
    userID = 3;
    baseGetUnit("users/" + userID)
      .end((err, res) => {
        expect(res.body.data[0]).to.have.property("id", userID).to.be.a("number");
        console.log(res.body.data[0]);
        walletID = res.body.data[0].wallet_id;
        done();
      });
  });

  it("Response should be empty array when requested ID doesnt exist", (done) => {
    const notUserID = "aokaokoakoakoa";
    baseGetUnit("users/" + notUserID)
      .end((err, res) => {
        // eslint-disable-next-line no-unused-expressions
        expect(res.body.data).to.be.empty;
        done();
      });
  });
});

describe("handle request to invalid URL", () => {
  it("Expecting error message when requesting invalid URL", (done) => {
    baseGetUnit("user")
      .end((err, res) => {
        expect(res.body).to.be.a("object").to.have.property("message", "url not found");
        expect(res).to.have.property("statusCode", 404);
        done();
      });
  });
});

let token;
describe("Handle authentication feature", () => {
  it("Expecting statusCode 200 when login succeed", (done) => {
    basePostUnit("users/login")
      .send({
        email: "aning@gmail.com",
        password: "aninglucu"
      })
      .end((err, res) => {
        expect(res).to.have.property("statusCode", 200);
        console.log(res.request._data); // get http request body
        done();
      });
  });
  it("Expecting response data to have token when login succeed", (done) => {
    basePostUnit("users/login")
      .send({
        email: "aning@gmail.com",
        password: "aninglucu"
      })
      .end((err, res) => {
        expect(res.body.data).to.have.property("token").to.be.a("string");
        token = res.body.data.token;
        // console.log(token);
        done();
      });
  });
  it("Expecting status 200 when GET profile using valid token", (done) => {
    baseGetUnit("users/user/profile")
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        expect(res).to.have.property("statusCode", 200);
        done();
      });
  });
  it("Expecting status code 403 when login failed due to wrong email/password", (done) => {
    basePostUnit("users/login")
      .send({
        email: "aning@gmail.com",
        password: "aninglucubanget"
      })
      .end((err, res) => {
        expect(res).to.have.property("statusCode", 403);
        done();
      });
  });
  it("Expecting status 200 when register succeed", (done) => {
    basePostUnit("users/register")
      .send({
        name: "jaka",
        email: "jakawidadas@gmail.com",
        password: "123456"
      })
      .end((err, res) => {
        expect(res).to.have.property("statusCode", 200);
        done();
      });
  });
  it("Expecting message when register with existing email", (done) => {
    basePostUnit("users/register")
      .send({
        name: "jaka",
        email: "jakawidada@gmail.com",
        password: "123456"
      })
      .end((err, res) => {
        expect(res.body).to.have.property("message", "Email already exist!");
        done();
      });
  });
  it("Expecting status code 403 with message when logging in using unactivated account", (done) => {
    basePostUnit("users/login")
      .send({
        email: "jakawidada@gmail.com",
        password: "123456"
      })
      .end((err, res) => {
        expect(res).to.have.property("statusCode", 403);
        expect(res.body).to.have.property("message", "Please activate your account first!");
        done();
      });
  });
});

describe("Handle transfer feature", () => {
  let insertId;
  it("Expect status code 200 when posting new transaction", (done) => {
    console.log("wallet id adalah" + walletID);
    basePostUnit("transaction/transfer")
      .send({
        sender_wallet_id: walletID,
        receiver_wallet_id: 6,
        amount: 500,
        notes: "bayar apaan y"
      })
      .end((err, res) => {
        expect(res).to.have.property("statusCode", 200);
        expect(res.body.data).to.have.property("insertId");
        insertId = res.body.data.insertId;
        console.log(insertId);
        done();
      });
  });
  it("Expect status code 200 and message when confirming new transaction", (done) => {
    basePutUnit(`transaction/transfer/confirm/${userID}/${walletID}/${insertId}`)
      .send({ pin: "123456" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message", "Transaction succeeded");
        done();
      });
  });
});
