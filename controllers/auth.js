const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
// const Role = require("../controllers/role")

const User = require("../models/user").User;
const Admin = require("../models/admin").Admin;

exports.postLogin = (req, res, next) => {
  const {
    email,
    password
  } = req.body;

  if (!email || !password) {
    res.status(400).json({ msg: "All fields are required" });
  } else {
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          res.status(400).json({ msg: "User does not exist" });

        } else {
          console.log("User login")
          bcrypt
          //compare inputed password and admin.password
            .compare(password, user.password)
            //if inputed password does not match
            .then(match => {
              if (!match) {
                return res.status(400).json({ msg: "Invalid Password" });
              }
              //login as admin and a token is created and assigned to the admin
              jwt.sign({ id: user.id, role: user.role },
                process.env.JWT_SECRET_KEY, { expiresIn: "1h" },
                (err, token) => {
                  res.json({
                    token: `Bearer ${token}`,
                    user
                  })
                }
              )
            })
        }
      })
      .catch((err) => console.log(err))
  }
}