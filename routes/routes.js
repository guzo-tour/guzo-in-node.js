const express = require('express');

const Router = express.Router();
const {homePage ,detail}=require("../controller/tourController")
const {
  userSignupPage,
  userLoginPage,
  userSignup,
  userLogin,
} = require("../controller/authController");
const { validationRules } = require("../lib/validation_rules");
Router
  .get("/signup", userSignupPage)
  .post("/signup", validationRules[1], userSignup)
  .get("/login", userLoginPage)
  .post("/login", validationRules[0], userLogin)
  .get("/", homePage);
    Router.get("/detail", detail, (req, res) => {});  

module.exports = Router;