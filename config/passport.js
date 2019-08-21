// THIS FILE HANDLES AUTHENTICATION WITH PASSPORT AND JWT

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = require('../models/user').User;
const Admin = require('../models/admin').Admin;
// const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET_KEY;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async(jwt_payload, done) => {
      await User.findById(jwt_payload.id)
        .then(async user => {
          console.log(user)
          if (!user) {
            return done(null, false);
          }
          return done(null, user);
        })
        .catch(err => console.log(err));
    })
  );
};