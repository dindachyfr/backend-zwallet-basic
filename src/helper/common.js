// npm i joi   => validation package

const handleNotFound = (req, res, next) => {
  res.status(404);
  res.json({
    message: "url not found"
  });
};

const reponse = (res, result, statusCode, message, pagination) => {
  res.json({
    status: "Success",
    code: statusCode,
    data: result,
    message: message,
    pagination: pagination
  });
};

module.exports = { handleNotFound, reponse };
