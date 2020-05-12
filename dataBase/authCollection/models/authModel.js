const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authSchema = new Schema({
  password: {
    type: String,
    required: true,
  },
});

const auth = mongoose.model('auths', authSchema);
module.exports = auth;
