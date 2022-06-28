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
.post(checkAuthentication.isLoggedIn, checkAuthentication.isAuthorized,validationRules[3], tourController.editTour)
.delete(checkAuthentication.isLoggedIn, checkAuthentication.isAuthorized, tourController.deleteTour)
// router
// .route('/:id')
// .patch(tourController.updateTour)
// .delete(authController.protect,authController.restrictTo('admin','lead-guide'),tourController.deleteTour);
  
module.exports = router; 