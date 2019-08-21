const jwt = require("jsonwebtoken");
const User = require("../models/user").User;

const authenticate = (req, res, next) => {
  const token = getToken(req);

  if (!token) {
    res.status(400).json({
      msg: "Token Required"
    });
  } else {
    jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, user) {
      if (err) {
        return res.status(401).json({
          msg: "Invalid Token, Are you logged in?",
          error: err
        });
      }
      console.log(user);
      //
      User.findById(user.id)
        .then(user => {
          req.user = user;
          console.log("This is the tokern user:=> ", user)
          req.user.role = user.role;
          return next();
        }).catch(err => {
          return res.json({ msg: err.message || "Error occured" })
        });
    });
  }
};

//splitting the token
const getToken = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token
  }
  return null;
}

module.exports = authenticate;