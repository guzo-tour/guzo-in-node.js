const conn = require('../config/DB_Connection');
const { promisify} = require("util");
const jwt = require("jsonwebtoken");
module.exports = {
    isLoggedIn: async(req, res, next)=> {
       // 1) Getting token and check of it's there
        let token;
        if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }
        if (!token) {
           
            return res.render('auth/loginPage',{error: null});
        }
        // 2) Verification token;
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
      // 3) Check if user still exists
 
        const query = `select * from user where user_id = ${decoded.userId}`;
        conn.query(query,(error,result)=>{
            if(error) throw error;
            else{
                if(result.length==0){
                    return res.render('auth/signupPage',{error: null});
                }
                const currentUser = result[0];
                req.user = currentUser;
                next();
            }

        })

    },  
    isNotLoggedin: async(req, res, next)=> {
        if (!req.cookies.jwt) {
            return next();
        }
        return res.redirect('/');
    },
    isAuthorized: async(req, res, next)=>{
        console.log("hello");
        const role = req.user.role;
        console.log(role);
        if(role!="admin"){
            return res.render('pages/error', {errorMessage:"You hava no permission to do this"});
        }
        next();
    }
}