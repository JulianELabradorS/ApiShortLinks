const express = require('express');
const response = require('../../network/response');
const controller = require('./index');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const jwtMiddlewareAuth = require('../../utils/middlewares/auntentication/jwt');

const router = express.Router();

//ROUTES
router.post('/login', login);
router.patch('/update_password/:user_id', jwtMiddlewareAuth, update);

//INTERNAL FUNCTIONS

function login(req, res, next) {
  controller
    .login(req)
    .then((userData) => {
      req.login(userData, { session: false }, function (error) {
        if (error) {
          next(error);
        }
        const payload = {
          sub: userData._id,
          email: userData.email,
          username: userData.username,
        };

        const signedJwt = jwt.sign(payload, config.jwtsecret);
        res.cookie('userToken', signedJwt, {
          httpOnly: config.env === 'production',
          secure: config.env === 'production',
        });
        response(req, res, userData, 200);
      });
    })
    .catch((error) => {
      next(error);
    });
}

function update(req, res, next) {
  const { user_id: id } = req.params;
  const data = req.body;
  controller
    .updatePassword(id, data)
    .then((message) => {
      response(req, res, message, 200);
    })
    .catch((error) => {
      next(error);
    });
}

module.exports = router;
