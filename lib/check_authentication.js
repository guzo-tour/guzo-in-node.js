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
            req.flash('fail', 'You are not logged please login');
            return res.redirect('/auth/login');
        }
        // 2) Verification token;
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
      // 3) Check if user still exists
 
        const query = `select * from user where user_id = ${decoded.userId}`;
        conn.query(query,(error,result)=>{
            if(error) throw error;
            else{
                if(result.length==0){
                    req.flash('fail', 'The user belonging to this token does no longer exist');
                    return res.redirect('/auth/register');
                }
                const currentUser = result[0];
                req.user = currentUser;
                next();
            }

        })

    },  
    isNotLoggedin(req, res, next) {
        if (!req.cookies.jwt) {
            return next();
        }
        return res.redirect('/');
    },
    isAuthorized(req, res, next){
        const role = req.user.role;
        if(role!="admin"){
            return res.redirect('/pages/404');
        }
    }
}