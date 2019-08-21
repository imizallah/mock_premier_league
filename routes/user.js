const express = require("express");
const userController = require("../controllers/user");
const passport = require('passport');

const router = express.Router();


router.post("/register/:admin?", userController.signUp); //for admin registration
router.post("/register/", userController.signUp); //for user registration
router.get("/view", passport.authenticate('jwt', { session: false }), userController.getAllUser);
router.get("/view-admin", userController.getAllAdmin);



module.exports = router;