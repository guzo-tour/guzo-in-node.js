const express = require("express");

const viewsController = require('../controller/viewsController');
<<<<<<< HEAD
const { isNotLoggedin } = require("../lib/check_authentication");
=======
const authController  =  require('../controller/authController');
const checkAuthentication = require('../lib/check_authentication')


>>>>>>> 7484a8b9cdb44583b9989551d01167c5a5b09039
//const authController = require('../controllers/authController');

const router = express.Router();
router.get('/',  viewsController.homePage);
router.get('/detail', viewsController.detail);
<<<<<<< HEAD
router.get('/login', isNotLoggedin ,viewsController.userLoginPage);
router.get('/signup', isNotLoggedin ,viewsController.userSignupPage);
router.get('/dashboard', viewsController.dashBoardPage);
router.get('/addTour', viewsController.addTourPage);
router.get('/editTour', viewsController.editTourPage);
=======
router.get('/login',checkAuthentication.isNotLoggedin, viewsController.userLoginPage);
router.get('/signup',checkAuthentication.isNotLoggedin, viewsController.userSignupPage);
router.get('/dashboard', checkAuthentication.isLoggedIn, checkAuthentication.isAuthorized, viewsController.dashBoardPage);
router.get('/profile', checkAuthentication.isLoggedIn, viewsController.userProfilePage);
router.get('/addTour', checkAuthentication.isLoggedIn, checkAuthentication.isAuthorized,viewsController.addTourPage);
router.get('/editTour', checkAuthentication.isLoggedIn,  checkAuthentication.isAuthorized, viewsController.editTourPage);


>>>>>>> 7484a8b9cdb44583b9989551d01167c5a5b09039

module.exports = router;


