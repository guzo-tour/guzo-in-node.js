
const sessions = require('express-session')
const { validationResult } = require('express-validator')
const {encryptData, decryptData} = require('../lib/modules')
const {userHomePage}=require("./authController");
const conn = require('../config/DB_Connection')
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

module.exports = {
    homePage: (req, res, next)=>{
         
            try {
              var query = "select * from `tour`";
              if (req.query.searchBy && req.query.search_query) {
            
               query = `SELECT * FROM tour INNER JOIN address ON tour.tour_id = address.tour_id WHERE ${req.query.searchBy} LIKE  "%${req.query.search_query}%"`;
              }
              conn.query(query, (error, result) => {
                if (error) {
                  throw error;
                }

                userHomePage(req, res, next, result);
              });
            } catch (error) {
             console.log(error)
            }
        
       
    },
    userLoginPage: (req, res)=>{
        return res.render('auth/loginPage', {error: null})        
    },
    detail: (req, res) => {
   
        const id=req.query.tour_id;
        sql ="SELECT * FROM tour INNER JOIN address ON tour.tour_id = address.tour_id WHERE tour.tour_id=?";
        sql1 ="SELECT * FROM review WHERE tour_id=? ORDER BY id DESC LIMIT 4;";
        count = "SELECT COUNT(*) FROM booking WHERE tour_id=?;";
        const query = "SELECT * FROM `user` where `user_id`=?;";
         conn.query(sql,id,function(err,result,fields){
            if (err) throw err;
            conn.query(sql1, id, function (err, result2, fields) {
             if (err) throw err;
               conn.query(count, id, async function (err, count, fields) {
                 if (err) throw err;
                   if (req.cookies.jwt) {
                       
                      const  decoded =  await  promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET);
                try{
                    
                    conn.query(query, decoded.userId, (error, userResult) => {
                      if (error) {
                        console.log(error);
                        throw error;
                      }
    
                     res.render("pages/detail", {
                       result,
                       result2,
                       count,
                       isLogged: true,
                       user: userResult,
                       bookedAlready:false
                     });
                    });
                }catch(err){
                    next(err);
                }
    
                      
                   
                   }
                   else{
                      res.render("pages/detail", {
                        result,
                        result2,
                        count,
                        isLogged: false,
                      });
                   }
               });
           });
       
         })
        },
    userSignupPage: async(req, res, next)=>{
        return res.render('auth/signupPage', {error: null})
    },
   
    dashBoardPage: (req,res)=>{

    },
    userProfilePage: async(req,res)=>{

    },
    addTourPage: async(req,res)=>{
      return res.render('admin/addTour', {error: null})
    },
    editTourPage: async(req,res)=>{
      const tourId = req.query.tourId;
      sql =`SELECT * FROM tour INNER JOIN address ON tour.tour_id = address.tour_id WHERE tour.tour_id= ${tourId}`;
      conn.query(sql, (error, tours)=>{
        if(error){
          console.log(error.message);
           return res.render('pages/404',{errorMessage:error.sqlMessage});
        } 
        else{
          return res.render('admin/editTour', {tour: tours[0], error: null,isLogged:true,user:req.user})
        }
      })
    }
    // errorPage: async(req,res)=>{
    //   return res.render('pages/404');
    // }
}
