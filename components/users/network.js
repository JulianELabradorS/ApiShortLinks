const express = require('express');
const controller = require('./');
const response = require('../../network/response');
const jwtMiddlewareAuth = require('../../utils/middlewares/auntentication/jwt');

const router = express.Router();

//ROUTES
router.get('/', getUsers);
router.get('/:emailOrUserName', getUser);
router.post('/sing-up', createUser);
router.patch('/update/:user_id', jwtMiddlewareAuth, updateUser);
router.delete('/:user_id', jwtMiddlewareAuth, deleteUSer);

//INTERNAL FUNCTIONS

//GET ALL USERS
function getUsers(req, res, next) {
  controller
    .getUsers()
    .then((users) => {
      response(req, res, users, 200);
    })
    .catch((error) => {
      next(error);
    });
}
//GET ALL USERS
function getUser(req, res, next) {
  const { emailOrUserName } = req.params;
  controller
    .getUsers(emailOrUserName)
    .then((user) => {
      response(req, res, user, 200);
    })
    .catch((error) => {
      next(error);
    });
}

function createUser(req, res, next) {
  controller
    .singUp(req.body)
    .then((userdata) => {
      response(req, res, userdata, 201);
    })
    .catch((error) => {
      next(error);
    });
}

function updateUser(req, res, next) {
  const { user_id } = req.params;
  const data = req.body;
  controller
    .updateUser(user_id, data)
    .then((message) => {
      response(req, res, message, 200);
    })
    .catch((error) => {
      next(error);
    });
}

function deleteUSer(req, res, next) {
  const { user_id } = req.params;
  controller
    .deleteUser(user_id)
    .then((message) => {
      response(req, res, message, 200);
    })
    .catch((error) => {
      next(error);
    });
}

module.exports = router;
