const express = require("express");

const viewsController = require('../controller/viewsController');
const { isNotLoggedin } = require("../lib/check_authentication");
//const authController = require('../controllers/authController');

const router = express.Router();
router.get('/',  viewsController.homePage);
router.get('/detail', viewsController.detail);
router.get('/login', isNotLoggedin ,viewsController.userLoginPage);
router.get('/signup', isNotLoggedin ,viewsController.userSignupPage);
router.get('/dashboard', viewsController.dashBoardPage);
router.get('/addTour', viewsController.addTourPage);
router.get('/editTour', viewsController.editTourPage);

module.exports = router;


