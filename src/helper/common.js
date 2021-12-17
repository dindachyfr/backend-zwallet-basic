const handleNotFound = (req, res, next) => {
  res.status(404)
  res.json({
    message: 'url not found'
  })
}

const reponse = (res, result, statusCode, error) =>{
  res.json({
    status: "Success",
    code: statusCode,
    data: result,
    message: null

  })
}

module.exports = {
  handleNotFound, reponse}