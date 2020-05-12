const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const users = require('../../../dataBase/userCollection/userDB');
const bcrypt = require('bcrypt');

passport.use(
  new BasicStrategy(async function (usernameOrEmail, password, callback) {
    try {
      let userData = await users.getUser({ email: usernameOrEmail });
      if (!userData) {
        userData = await users.getUser({ username: usernameOrEmail });
      }

      if (!userData) {
        const error = new Error('invalid username or password');
        error.status = 403;
        return callback(error);
      }

      if (!(await bcrypt.compare(password, userData.password_id.password))) {
        const error = new Error('invalid username or password');
        error.status = 403;
        return callback(error);
      }
      delete userData._doc.password_id;
      delete userData._doc.__v;

      return callback(null, userData._doc);
    } catch (error) {
      return callback(error);
    }
  })
);
