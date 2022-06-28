const express = require('express');
const tourController  = require('../controller/tourController');
const authController  =  require('../controller/authController');
const router = express.Router();
router
.route('/')
.post(tourController.addTour);

// router
// .route('/:id')
// .patch(tourController.updateTour)
// .delete(authController.protect,authController.restrictTo('admin','lead-guide'),tourController.deleteTour);
  
module.exports = router; 