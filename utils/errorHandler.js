const config = require('../config');

function errroHandler(error, req, res, next) {
  console.log(error);
  const message = error.message || 'error en el servidor';
  const status = error.status || 500;
  const stack = error.stack || null;
  res.status(status).json({
    error: true,
    status,
    message: message,
    stack: config.env === 'development' ? stack : '',
  });
}
module.exports = errroHandler;
