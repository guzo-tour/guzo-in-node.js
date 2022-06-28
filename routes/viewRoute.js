const express = require("express");

const viewsController = require('../controller/viewsController');
//const authController = require('../controllers/authController');

const router = express.Router();
router.get('/',  viewsController.homePage);
router.get('/detail', viewsController.detail);
router.get('/login', viewsController.userLoginPage);
router.get('/signup', viewsController.userSignupPage);
router.get('/dashboard', viewsController.dashBoardPage);
router.get('/profile', viewsController.userProfilePage);
router.get('/addTour', viewsController.addTourPage);
router.get('/editTour', viewsController.editTourPage);

module.exports = router;


