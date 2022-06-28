const express = require('express');
const tourController  = require('../controller/tourController');
const authController  =  require('../controller/authController');
const checkAuthentication = require('../lib/check_authentication');
const router = express.Router();
router
.route('/')
.post(tourController.addTour);

router
.route('/:id')
.patch(checkAuthentication.isLoggedIn, checkAuthentication.isAuthorized, tourController.editTour)
.delete(checkAuthentication.isLoggedIn, checkAuthentication.isAuthorized, tourController.deleteTour)
  
module.exports = router; 