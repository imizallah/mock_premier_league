const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({

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

module.exports = { Admin: mongoose.model('admin', adminSchema) };