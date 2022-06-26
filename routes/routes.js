const express = require('express');

const Router = express.Router();

const { userSignupPage, userSignin, userSignup } = require('../controller/userController')

Router
    .get('/signup', userSignupPage)
    .post('/signup', userSignup)
    .get('/login', (req, res)=>{
        res.render('auth/loginPage')
    })
    .post('/login', (req, res)=>{

    })

module.exports = Router;