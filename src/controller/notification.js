const modelNotification = require("../models/notification");
const commonHelper = require("../helper/common");

const postNotification = async (req, res, next) => {
  try {
    const { title, message } = req.body;
    const role = req.role;
    const fileName = req.file.filename; // `${req.get("host")} kalo mau dinamis
    const dataNotification = {
      title,
      message,
      image: `http://localhost:5000/file/${fileName}`
    };
    if (role === "admin") {
      const result = await modelNotification.postNotification(dataNotification);
      commonHelper.reponse(res, result, 200);
    } else {
      const errorRes = new Error("You are not authorized to take this action");
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

const getInfoNotification = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const offset = (page - 1) * limit;
    const sort = req.query.sort || "date";
    const order = req.query.order || "DESC";
    const result = await modelNotification.getInfoNotification({ sort, order, limit, offset });
    const resultCount = await modelNotification.countInfoNotification();
    const { total } = resultCount[0];
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

module.exports = {
  postNotification,
  getInfoNotification
};
