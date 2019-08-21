const mongoose = require('mongoose');
const { Schema } = mongoose;

const teamSchema = new Schema({
  teamName: {
    type: String,
    required: true
  },
  manager: {
    type: String,
    required: true
  },
  stadium: {
    type: String,
    required: true,
  },
});

module.exports = { Team: mongoose.model('team', teamSchema) };