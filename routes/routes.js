const express = require('express');

const Router = express.Router();

Router.get("/signup", (req, res) => {
  res.render("auth/signupPage");
})
  .post("/signup", (req, res) => {})
  .get("/login", (req, res) => {
    res.render("auth/loginPage");
  })
  .post("/login", (req, res) => {})
  .get("/", (req, res) => {});
  

module.exports = Router;