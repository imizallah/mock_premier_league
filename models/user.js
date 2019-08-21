const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({

  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});

module.exports = { User: mongoose.model('user', userSchema) };