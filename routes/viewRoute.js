const express = require("express");

const viewsController = require('../controllers/viewsController');
//const authController = require('../controllers/authController');

const router = express.Router();
router.get('/',  viewsController.homePage);
router.get('/tour/:slug', viewsController.tourDetail);
router.get('/login', viewsController.login);
router.get('/signup', viewsController.signup);
router.get('/dashboard', viewsController.dashboard);
router.get('/profile', viewsController.profile);
router.get('/addTour', viewsController.addTour);
router.get('/editTour', viewsController.editTour);

module.exports = router;


