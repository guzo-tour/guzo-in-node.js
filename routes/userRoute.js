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
<<<<<<< HEAD
  .get("/forgotPassword", isNotLoggedin, forgotPassword)
  .post("/resetPassword", validationRules[3], isNotLoggedin,resetPassword, reset);
module.exports = router;

=======
  // .post("/forgotPassword", forgotPassword)
  // .patch("/resetPassword", resetPassword);
module.exports = router;
>>>>>>> 7484a8b9cdb44583b9989551d01167c5a5b09039
