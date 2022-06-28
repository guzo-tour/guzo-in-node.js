const sessions = require('express-session');
const { validationResult } = require('express-validator');
const {encryptData, decryptData} = require('../lib/modules');
const conn = require('../config/DB_Connection');

module.exports = {
    userLogin: (req, res)=>{
        const error = validationResult(req)
        const { body } = req
        if (!error.isEmpty()) {
            console.log(error)
            return res.render('auth/loginPage', {error: error.array()[0].msg
            }); 
        }
        try{
            let query = 'select * from user where username=?';
            conn.query(query, body.user_name, async(err, result)=>{
                if (err)
                {
                    console.log(err)
                     throw err
                }

                if(result.length == 0 || !(await decryptData(body.password, result[0].pw))){
                    return res.render('auth/loginPage',  { error: 'Invalid Username or Password'});
                }

                const user = {
                  role: "user",
                  userId: result[0].user_id
                };

                const token = signToken(user);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() +
                        process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000 
                        ),
                        httpOnly: true,
                };
              

                res.cookie("jwt", token, cookieOptions);
                return res.redirect('/')
            })
        }catch(err){
            next(err);
        }
    },
    userSignup: async(req, res, next)=>{
        const error = validationResult(req)
        const { body } = req

        if (!error.isEmpty()) {
            return res.render('auth/signupPage', {error: error.array()[0].msg
            });
        }

        try{
            let query = "SELECT * FROM `user` WHERE `username`=?";
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
            
            const hashedPass = await encryptData(body.password)
            query = 'insert into `user`(`first_name`, `last_name`, `email`, `username`, `pw`, `phone_number`) values(?,?,?,?,?,?)'
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
                req.session.user = {
                    role: 'user',
                    userId: encryptData(rows.insertId.toString())
                }
                res.redirect('/')
            });		
        }catch(err){
            next(err);
        }
    },
    changePassword: async(req,res)=>{

    },
    forgotPassword: async(req,res)=>{

    },
    resetPassword: async(req,res)=>{

    },
    userLogout: (req, res, next)=>{
        
    }
}
