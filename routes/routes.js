const express = require('express');

const Router = express.Router();

const { userSignupPage, userLoginPage, userSignup, userLogin } = require('../controller/userController')

const { validationRules } = require('../lib/validation_rules')

Router
    .get('/signup', userSignupPage)
    .post('/signup', validationRules[1], userSignup)
    .get('/login', userLoginPage)
    .post('/login', validationRules[0], userLogin)

module.exports = Router;