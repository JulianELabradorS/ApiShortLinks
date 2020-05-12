const passport = require('passport');
const bcrypt = require('bcrypt');
const userService = require('../../dataBase/userCollection/userDB');

//BASIC STRATEGY(PASSPORT)
require('../../utils/auth/strategies/basic');

module.exports = function (injectedStore) {
  const store = injectedStore;
  async function login(req, res, next) {
    return new Promise((resolve, reject) => {
      passport.authenticate('basic', (error, userData) => {
        if (error) {
          reject(error);
        }

        resolve(userData);
      })(req, res, next);
    });
  }

  //SAVE PASSWORD ON DB
  async function newPassword(password) {
    password = password ? await bcrypt.hash(password, 10) : null;
    return new Promise((resolve, reject) => {
      store.savePassword(password, (error, password_id) => {
        error ? reject(error) : resolve(password_id);
      });
    });
  }

  //DELETE PASSWORD
  function deletePassword(password_id) {
    return new Promise((resolve, reject) => {
      store.deletePassword(password_id, (error, deletedPassword) => {
        error ? reject(error) : resolve(deletedPassword);
      });
    });
  }

  //UPDATE PASSWORD ON DB
  async function updatePassword(id, data) {
    const { old_password, new_password } = data;
    if (id && old_password && new_password) {
      const userData = await userService.getUser({ _id: id });
      console.log(userData);
      if (!userData) {
        const error = new Error('User not found');
        error.status = 404;
        throw error;
      }
      console.log(data);
      if (!(await bcrypt.compare(old_password, userData.password_id.password))) {
        const error = new Error('Invalid password');
        error.status = 403;
        throw error;
      }
      const hashedPassword = await bcrypt.hash(new_password, 10);
      return new Promise((resolve, reject) => {
        store.updatePassword(userData.password_id._id, hashedPassword, (error, message) => {
          error ? reject(error) : resolve(message);
        });
      });
    }
  }

  return {
    newPassword,
    login,
    deletePassword,
    updatePassword,
  };
};
