const mongoose = require('mongoose');
const { Schema } = mongoose;

const fixtureSchema = new Schema({

  home_team: {
    type: String,
    required: true
  },
  away_team: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  home_team_scores: {
    type: Number,
    default: 0
  },
  away_team_scores: {
    type: Number,
    default: 0
  },
  match_period: {
    type: String,
    required: true
  },
  match_status: {
    type: String,
    required: true
  },
  match_date: {
    type: String,
    required: true
  }

});


module.exports = { Fixture: mongoose.model('fixture', fixtureSchema) };