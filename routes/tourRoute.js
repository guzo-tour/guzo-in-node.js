const express = require('express');
const tourController  = require('../controller/tourController');
const authController  =  require('../controller/authController');
const checkAuthentication = require('../lib/check_authentication')
const { validationRules } = require("../lib/validation_rules");
const router = express.Router();
router
.route('/')
.post(validationRules[2], tourController.addTour);

router
.route('/:tourId')
.post(checkAuthentication.isLoggedIn,checkAuthentication.isAuthorized, tourController.editTour)
.delete(checkAuthentication.isLoggedIn, checkAuthentication.isAuthorized, tourController.deleteTour)

module.exports = router; 