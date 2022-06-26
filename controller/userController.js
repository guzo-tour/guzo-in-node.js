const sessions = require('express-session')
const conn=require("../config/DB_Connection");
const {validationRules} = require('express')

module.exports.controllers = {
    homePage: (req,res)=>{
      const sql="SELECT * FROM tour INNER JOIN address ON tour.tour_id = address.tour_id";
      const data=conn.query(sql);
      console.log(data);
  
          

        return res.render("pages/index");
    },
    userLoginPage: (req, res)=>{
<<<<<<< HEAD
        isLogged = false
     
=======
        return res.render('/auth/login')        
>>>>>>> a5ed2966ab5ad0a1d68dd2b70b8c3a147860c3db
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