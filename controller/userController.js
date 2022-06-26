const sessions = require('express-session')
const conn=require("../config/DB_Connection");
const {validationRules} = require('express')

module.exports.controllers = {
 

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