const express = require('express');
const { resetPassword, forgotPassword } = require('../controller/aController');
const router = express.Router();
const {
  userSignupPage,
  userLoginPage,
  userSignup,
  userLogin,
  userLogout
} = require("../controller/authController");
const {dashBoardPage} = require("../controller/viewsController");
const { validationRules } = require("../lib/validation_rules");
router
  .post("/signup", validationRules[1], userSignup)
  .post("/login", validationRules[0], userLogin)
  .get("/logout", userLogout);
  // .post("/forgotPassword", forgotPassword)
  // .patch("/resetPassword", resetPassword);
module.exports = router;

