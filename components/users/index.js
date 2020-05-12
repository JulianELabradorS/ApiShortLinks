const config = require('../../config');
let store;
if (config.dbUrl) {
  store = require('../../dataBase/userCollection/userDB');
} else {
  store = require('');
}

const ctrl = require('../../components/users/controller');

module.exports = ctrl(store);
