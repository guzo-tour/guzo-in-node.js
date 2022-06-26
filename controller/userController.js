const sessions = require('express-session')

const { validationRules } = require('express-validator')

const {encryptPass, decryptPass} = require('../lib/modules')

const conn = require('../config/DB_Connection')

module.exports = {
    userLoginPage: (req, res)=>{
        return res.render('/auth/loginPage')        
    },

    userLogin: (req, res)=>{
        const error = validationRules(req.body)
    },
    
    userSignupPage: (req, res, next)=>{
        return res.render('/auth/signupPage')
    },
    
    userSignup: async(req, res, next)=>{
        const error = validationRules(req.body)
        const { body } = req.body

        if (!error.isEmpty()) {
            return res.render('auth/signupPage', {error: error.array()[0].msg
            });
        }

        try{
            let query = "SELECT * FROM `users` WHERE `user_name`=?";
            conn.query(query, [body.user_name], async(error, row)=>{
                if (error)
                {
                    console.log(error)
                    throw error
                }
                
                if (row.length >= 1) {
                    return res.render('auth/signupPage', {error: 'This Username already in use.'});
                }
            })
            
            const hashedPass = await encryptPass(body.password)
            query = 'insert into `users`(`first_name`, `last_name`, `email`, `user_name`, `password`, `phone`) values(?,?,?,?,?,?)'
            conn.query(query, [body.first_name, body.last_name, body.email, body.user_name, hashedPass, body.phone], (error, rows)=>{
                if(error)
                {
                    console.log (error);
                    throw error;
                }
                
                if (rows.affectedRows !== 1) {
                    return res.render('auth/signupPage', 
                                        {error: 'Your registration has failed.'});
                }

                res.render("auth/signupPage",
                            {msg: 'You have successfully registered. You can Login now!'});
             });		
        }catch(err){
            next(err);
        }

    }
}