const express = require('express');
const { resetPassword, reset } = require('../controller/authController');
const { forgotPassword } = require('../controller/viewsController')
const router = express.Router();
const {
  userSignupPage,
  userLoginPage,
  userSignup,
  userLogin,
  userLogout
} = require("../controller/authController");
const {dashBoardPage, userProfilePage, editProfile} = require("../controller/viewsController");
const { validationRules } = require("../lib/validation_rules");
const { isLoggedIn, isNotLoggedin } = require('../lib/check_authentication')
router
  .post("/signup", validationRules[1], userSignup)
  .post("/login", validationRules[0], userLogin)
  .get("/logout", userLogout)
  .get('/profile',isLoggedIn, userProfilePage)
  .post('/editprofile', validationRules[2], isLoggedIn, editProfile)
  .get("/forgotPassword", isNotLoggedin, forgotPassword)
  .post("/resetPassword", validationRules[3], isNotLoggedin,resetPassword, reset);
module.exports = router;

