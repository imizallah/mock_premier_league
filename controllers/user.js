const bcrypt = require('bcryptjs'); //importing bcryptjs
const jwt = require("jsonwebtoken"); //importing jsonwebtoken

const User = require("../models/user").User;

module.exports = {
  //user signUp
  signUp: async(req, res, next) => {

    const {
      email,
      password,
      username
    } = req.body;

    //if any of the input fields is empty display an error message
    if (!email || !username || !password) return res.status(400).json({ msg: "Please fill out all fields now....." })


    await User.findOne({ email })
      .then(async(user) => {
        if (user) {
          return res.status(400).json({ msg: "User already exist" })
        } else {
          let hashedPassword;
          try {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
          } catch (error) {
            throw error;
          }

          let role = req.params.admin == "admin" ? "admin" : "user";
          await new User({
              email,
              username,
              password: hashedPassword,
              role
            }).save()
            .then(user => {
              // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "2h" });

              // res.header("auth_token", token).send(token);

              const authenticatedUser = {
                id: user._id,
                email: user.email,
                username: user.username
              }
              return res.json({
                user: authenticatedUser
              });
            })
            .catch(err => {
              return res.json({ msg: err.message || "failed to create account" });
            })
        }
      }) // End User find then
      .catch(err => {
        return res.json({ msg: err.message || "failed to create account" });
      });

  }, //End Signup Function


  // ====================================== GET ALL USERS ROUTE ==========================================

  getAllUser: async(req, res, next) => {
    await User.find()
      .then(users => {
        if (users) {
          return res.json(users)
        }
        return res.json({ msg: "No users found!!!" })
      })
  },

  //===================================== GET ALL ADMINS ROUTE =========================================

  getAllAdmin: (req, res, next) => {
      User.find({
          role: 'admin'
        })
        .then(user => {
          res.json(user);
        })
        .catch(err => res.json({ msg: "failed" }))
    }
    // getAllAdmin: (req, res, next) => {
    //   User.find({
    //       role: "admin",
    //     })
    //     .then(user => {
    //       res.json(user);
    //     })
    //     .catch(err => res.json({ msg: "failed" }))
    // }
}