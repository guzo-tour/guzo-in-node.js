const express = require('express');
const router = express.Router();
const reviewController = require('../controller/reviewController');
const authController = require('../controller/aController');
const validator = require('../lib/validation_rules');
const checkAuthentication = require('../lib/check_authentication');
router
.route('/:tourId')
.post(checkAuthentication.isLoggedIn,validator.validationRules[4], reviewController.giveReview)
.patch(checkAuthentication.isLoggedIn,validator.validationRules[5], reviewController.editReview)
.delete(checkAuthentication.isLoggedIn, reviewController.deleteReview);
module.exports = router;