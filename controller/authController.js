const sessions = require('express-session')
const { validationResult } = require('express-validator')
const {encryptData, decryptData,signToken} = require('../lib/modules')
const conn = require('../config/DB_Connection')
const { promisify} = require("util");
const jwt = require("jsonwebtoken");
module.exports = {

    userHomePage: async (req, res, next, results,filter)=>{
        if(req.cookies.jwt){
            const  decoded =  await  promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET);
            const query = "SELECT * FROM user where user_id=?;"
            try{
                conn.query(query, decoded.userId, (error, result) => {
                  if (error) {
                    console.log(error);
                  }
                  res.render("pages/index", {
                    isLogged: true,
                    msg: "Welcome back user",
                    result: results,
                    user: result,
                    filter
                  });
                });
            }catch(err){
                next(err);
            }
        
    }
        else {
             res.render("pages/index", {
               isLogged: false,
               msg: `Welcome back user`,
               result: results,
               filter,
             });
        
        }
    },

 

    userLogin: async(req, res)=>{
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
                    return res.render('auth/loginPage',  { error: 'Server error try again'});
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
                 res.redirect("/");
            })
        }catch(err){
            next(err);
        }
    },
    
    userSignupPage: (req, res, next)=>{
        return res.render('auth/signupPage', {error: null})
    },
    
    userSignup: async(req, res, next)=>{
        const error = validationResult(req)
        const { body } = req

        if (!error.isEmpty()) {
            return res.render('auth/signupPage', {error: error.array()[0].msg
            });
        }
        try{
            let query = "SELECT * FROM user WHERE username=?";
            conn.query(query, [body.user_name], async(error, row)=>{
                if (error)
                {
                    console.log(error)
                    return res.render('auth/signupPage', { error: 'Server error try again'});
                }
                
                if (row.length >= 1) {
                    return res.render('auth/signupPage', { error: 'The username is already used'});
                }
            })
            
            const hashedPass = await encryptData(body.password)
            query = 'insert into user(first_name, last_name, email, username, pw, phone_number) values(?,?,?,?,?,?)'
            conn.query(query, [body.first_name, body.last_name, body.email, body.user_name, hashedPass, body.phone], async (error, rows)=>{
                if(error)
                {
                    console.log (error);
                    return res.render('auth/signupPage', {error: 'Your registration has failed. Try again'});
                }
                
                if (rows.affectedRows !== 1) {
                    return res.render('auth/signupPage', {error: 'Your registration has failed. Try again'});
                }
                const user = {
                  role: "user",
                  userId:rows.insertId,
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
                res.redirect('/')
            });    
        }catch(err){
            next(err);
        }

    },
    userLogout: (req, res) => {
        console.log(655)
        res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() -10 * 1000),
        httpOnly: true
  });
  res.redirect("/");
  

}
}