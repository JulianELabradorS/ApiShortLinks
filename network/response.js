module.exports = function success(req, res, message, status) {
  let statusCode = status || 200;
  let statusMessage = message || '';

  res.status(status).json({
    error: false,
    status: statusCode,
    body: statusMessage,
  }).set;
};
