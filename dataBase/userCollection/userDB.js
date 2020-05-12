const Model = require('./models/userModel');

class UsersService {
  constructor() {
    this.Model = Model;
  }

  //OBTENER USUARIOS
  getUsers() {
    const users = this.Model.find();
    return users;
  }

  //OBTENER UN USUARIO DE DB (POR EMAIL O USERNAME)
  getUser(query) {
    return this.Model.findOne(query).populate('password_id');
  }

  //AGREGAR UN USUARIO A DB
  addUser(userData, callback) {
    const myUser = new this.Model(userData);
    myUser.save({}, (error, user) => {
      if (error) {
        error.status = 400;
        return callback(error, null);
      }

      return callback(null, user);
    });
  }

  //UPDATE USER
  updateUser(user_id, data, callback) {
    this.Model.updateOne({ _id: user_id }, data, (error, data) => {
      if (error) {
        error.status = 400;
        callback(error);
      }
      callback(null, data);
    });
  }

  //DELETE USER
  deleteUser(user_id, callback) {
    this.Model.deleteOne({ _id: user_id }, (error, data) => {
      if (error) {
        error.status = 400;
        callback(error);
      }
      callback(null, data);
    });
  }
}

module.exports = new UsersService();
