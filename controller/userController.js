const sessions = require('express-session')

const {validationRules} = require('express')

module.exports.controllers = {
    userLoginPage: (req, res)=>{
        return res.render('/auth/login')        
    },

    userLogin: (req, res)=>{
        const error = validationRules
    },
    userSignup: (req, res)=>{
        if(req.session.userID){
            return res.render('pages/index', {data: req.session.userID})
        }
        const user = req.body

    }
}