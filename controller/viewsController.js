
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
                if (req.query.searchBy == "<=" || req.query.searchBy == ">=") {
                  query = `SELECT * FROM tour INNER JOIN address ON tour.tour_id = address.tour_id WHERE tour.price ${req.query.searchBy}${req.query.search_query}`;
                } else {
                  query = `SELECT * FROM tour INNER JOIN address ON tour.tour_id = address.tour_id WHERE ${req.query.searchBy} LIKE  "%${req.query.search_query}%"`;
                }

             }
              conn.query(query, (error, result) => {
                if (error) {
                  throw error;
                }
                 if (req.query.searchBy){
                     userHomePage(req, res, next, result,{filter:true});
                }
                else{
                     userHomePage(req, res, next, result, { filter: false });

                }
                    
                    
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
    userProfilePage: (req, res, next)=>{
      user = req.user
      const query = 'select * from `tour` inner join `booking` on booking.tour_id=tour.tour_id where booking.user_id=?;'
      try{
        conn.query(query, user.user_id, (err, result)=>{
          if(err){
            console.log(err)
            return res.redirect('/error')
          }
          return res.render('pages/profilePage', { user, tours: result, message: ''})
        })
      }catch(err){
        next(err)
      }  
    },
    editProfile: (req, res, next)=>{
      const { user } = req
      const {body} = req
      let query = 'select * from `tour` inner join `booking` on booking.tour_id=tour.tour_id where booking.user_id=?;'
      try{
        conn.query(query, user.user_id, (err, result)=>{
          if(err){
            console.log(err)
            return res.redirect('/error')
          }
          query = 'update `user` set `first_name`=?, `last_name`=?, `phone_number`=? where user_id=?;'
          const error = validationResult(req)
          if(!error.isEmpty()){
            return res.render('pages/profilePage', { user, tours: result, message: error.array()[0].msg})
          }
          conn.query(query, [body.first_name, body.last_name, body.phone, user.user_id], (err, rows)=>{
            if(err){
              console.log(err)
              return res.redirect('/error')
            }
            if(rows.affectedRows < 1){
              return res.render('pages/profilePage', { user, tours: result, message: 'Unable to update profile, Try again'})
            }
            user.first_name = body.first_name
            user.last_name = body.last_name
            user.phone_number = body.phone
            return res.render('pages/profilePage', { user, tours: result, message: 'successfully edited profile'})
          })
        })
      }catch(err){
        next(err)
      }
    },
    addTourPage: async(req,res)=>{

    },
    editTourPage: async(req,res)=>{

    }
}
