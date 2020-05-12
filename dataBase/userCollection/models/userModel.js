const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'auths',
  },
  shortenLinks: Array,
  address: String,
  cellphone: Number,
  createdAt: Date,
});

const Model = mongoose.model('users', userSchema);

module.exports = Model;
