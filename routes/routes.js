const express = require('express');

const Router = express.Router();
const {homePage, addTour, displayAddTour}=require("../controller/tourController")

Router.get("/signup", (req, res) => {
  res.render("auth/signupPage");
})
  .post("/signup", (req, res) => {})
  .get("/login", (req, res) => {
    res.render("auth/loginPage");
  })
  .post("/login", (req, res) => {})

  .get("/", homePage);
  
  Router.get('/addTour', displayAddTour);
  Router.post('/addTour', addTour)

module.exports = Router;