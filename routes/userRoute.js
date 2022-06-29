const express = require('express');

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
const { isLoggedIn } = require('../lib/check_authentication')
router
  .post("/signup", validationRules[1], userSignup)
  .post("/login", validationRules[0], userLogin)
  .get("/logout", userLogout)
  .get('/profile',isLoggedIn, userProfilePage)
  .post('/editprofile', validationRules[2], isLoggedIn, editProfile)
  // .post("/forgotPassword", forgotPassword)
  // .patch("/resetPassword", resetPassword);
module.exports = router;