const { newPassword } = require('../auth/index');

module.exports = function (injectedStore) {
  let store = injectedStore;

  //GET ONE OR ALL USERS
  async function getUsers(emailOrUserName) {
    if (!emailOrUserName) {
      const users = store.getUsers();
      return users;
    }

    let user = await store.getUser({ email: emailOrUserName });
    if (!user) {
      user = await store.getUser({ username: emailOrUserName });
    }
    return new Promise((resolve, reject) => {
      if (!user) {
        const error = new Error('user not found');
        error.status = 404;

        reject(error);
      }
      delete user._doc.password_id;
      delete user._doc.cellphone;
      delete user._doc.address;
      resolve(user);
    });
  }

  //NEW USER REGISTRATION
  async function singUp(userData) {
    const { email, username, password, firstname, lastname } = userData;
    if (!email || !username || !password || !firstname || !lastname) {
      const error = new Error(
        'one or more fields are missing (email, username, password, firstname or lastname)'
      );
      error.status = 400;
      throw error;
    }

    userData.createdAt = new Date();
    userData.shortenlinks = [];

    const existEmail = await store.getUser({ email: userData.email });

    if (existEmail) {
      const error = new Error('another account exists with this email');
      error.status = 400;
      throw error;
    }
    const existUsername = await store.getUser({ username: userData.username });

    if (existUsername) {
      const error = new Error('another account exists with this username');
      error.status = 400;
      throw error;
    }

    await newPassword(password)
      .then((password_id) => {
        userData.password_id = password_id;
        delete userData.password;
      })
      .catch((error) => {
        throw error;
      });

    return new Promise((resolve, reject) => {
      store.addUser(userData, (error, newuser) => {
        if (error) {
          reject(error);
        }
        resolve(newuser);
      });
    });
  }
  //UPDATE A USER
  function updateUser(user_id, data) {
    return new Promise((resolve, reject) => {
      store.updateUser(user_id, data, (error, data) => {
        if (error) {
          reject(error);
        }
        if (data.n === 0) {
          const error = new Error('user not found');
          error.status = 404;
          reject(error);
        }
        if (data.nModified === 0) {
          const error = new Error('No field was modified');
          error.status = 400;
          reject(error);
        }
        resolve(`the user ${user_id} was modified in ${data.nModified} fields`);
      });
    });
  }

  //DELETE USER
  function deleteUser(user_id) {
    return new Promise((resolve, reject) => {
      store.deleteUser(user_id, (error, data) => {
        if (error) {
          reject(error);
        }
        if (data.deletedCount === 0) {
          const error = new Error('user not found');
          error.status = 404;
          reject(error);
        }
        resolve(`the user ${user_id} was deleted`);
      });
    });
  }

  return {
    singUp,
    getUsers,
    updateUser,
    deleteUser,
  };
};
