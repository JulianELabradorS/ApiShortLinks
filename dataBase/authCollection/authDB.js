const Model = require('./models/authModel');

class authService {
  constructor() {
    this.Model = Model;
  }
  //SAVE PASSWORD ON DB
  async savePassword(password, callback) {
    const newPassword = new this.Model({ password });
    newPassword.save({}, (error, password) => {
      if (error) {
        error.status = 400;
        callback(error, null);
      }
      callback(null, password.id);
    });
  }

  //UPDATE PASSWORD
  updatePassword(id, password, callback) {
    this.Model.updateOne({ _id: id }, { password }, (error, data) => {
      if (error) {
        callback(error);
      }
      console.log(data);
      callback(null, 'password cambiado con exito');
    });
  }
}

module.exports = new authService();
