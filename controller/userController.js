const sessions = require('express-session')



module.exports.controllers = {
    userLoginPage: (req, res)=>{
        isLogged = false

    },
    userLogin: (req, res)=>{
        isLogged = false

    },
    userSignup: (req, res)=>{
        if(req.session.userID){
            return res.render('pages/index', {data: req.session.userID})
        }
        const user = req.body

    }
}