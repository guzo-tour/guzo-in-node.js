const express = require('express');
const router = express.Router();
const bookingController = require('../controller/bookingController');

const validator = require('../lib/validation_rules');
const checkAuthentication = require('../lib/check_authentication');
router
.route('/')
.post(checkAuthentication.isLoggedIn, bookingController.book)
.get(checkAuthentication.isLoggedIn, bookingController.unbook);

module.exports = router;