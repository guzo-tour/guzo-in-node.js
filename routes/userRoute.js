const express = require('express');
const { resetPassword, forgotPassword } = require('../controller/aController');
const router = express.Router();
const {
  userSignupPage,
  userLoginPage,
  userSignup,
  userLogin,
} = require("../controller/authController");
const { validationRules } = require("../lib/validation_rules");
router
  .post("/signup", userSignup)
  .post("/login",  userLogin)
  .post("/forgotPassword",  forgotPassword)
  .patch("/resetPassword", resetPassword)
module.exports = router;