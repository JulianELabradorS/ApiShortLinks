const users = require("../components/users/network");
const auth = require("../components/auth/network");

const router = function (app) {
  app.use("/users", users);
  app.use("/auth", auth);
};

module.exports = router;
