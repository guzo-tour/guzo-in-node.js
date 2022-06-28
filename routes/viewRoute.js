const express = require("express");

const viewsController = require('../controller/viewsController');
const authController  =  require('../controller/authController');
const checkAuthentication = require('../lib/check_authentication')


//const authController = require('../controllers/authController');

const router = express.Router();
router.get('/',  viewsController.homePage);
router.get('/detail', viewsController.detail);
router.get('/login',checkAuthentication.isNotLoggedin, viewsController.userLoginPage);
router.get('/signup',checkAuthentication.isNotLoggedin, viewsController.userSignupPage);
router.get('/dashboard', checkAuthentication.isLoggedIn, checkAuthentication.isAuthorized, viewsController.dashBoardPage);
router.get('/profile', checkAuthentication.isLoggedIn, viewsController.userProfilePage);
router.get('/addTour', checkAuthentication.isLoggedIn, checkAuthentication.isAuthorized,viewsController.addTourPage);
router.get('/editTour', checkAuthentication.isLoggedIn,  checkAuthentication.isAuthorized, viewsController.editTourPage);



module.exports = router;


