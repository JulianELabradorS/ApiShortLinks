const config = require("../../config");
let store;
if (config.dbUrl) {
  store = require("../../dataBase/authCollection/authDB");
} else {
  store = require("");
}

const ctrl = require("../../components/auth/controller");

module.exports = ctrl(store);
