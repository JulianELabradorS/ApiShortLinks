const jwt = require('jsonwebtoken');
const config = require('../../../config');
function jwtMiddlewareAuth(req, res, next) {
  const { userToken: token } = req.cookies;
  if (!token) {
    const error = new Error('the user is not logged in');
    error.status = 400;
    next(error);
  }
  const user = jwt.verify(token, config.jwtsecret);
  if (user.sub !== req.params.user_id) {
    const error = new Error('you are not authorized to carry out this operation');
    error.status = 403;
    next(error);
  }
  next();
}

module.exports = jwtMiddlewareAuth;
