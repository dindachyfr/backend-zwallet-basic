const redis = require("redis");
const client = redis.createClient(6379);
client.connect();
const commonHelper = require("../helper/common");

const hitCacheTransactions = async (req, res, next) => {
  const transactionsRedis = await client.get("transactions");
  const result = JSON.parse(transactionsRedis);
  if (result !== null) {
    commonHelper.reponse(res, result, 200, "Data from redis");
  } else {
    next();
  }
};

const hitCacheProfile = async (req, res, next) => {
  const profileRedis = await client.get("profile");
  const result = JSON.parse(profileRedis);
  if (result !== null) {
    commonHelper.reponse(res, result, 200, "Data from redis");
  } else {
    next();
  }
};

const delProfileRedis = async (req, res, next) => {
  client.del("profile");
  next();
};

const delTransactionsRedis = async (req, res, next) => {
  client.del("transactions");
  next();
};

module.exports = {
  hitCacheTransactions,
  hitCacheProfile,
  delProfileRedis,
  delTransactionsRedis
};
