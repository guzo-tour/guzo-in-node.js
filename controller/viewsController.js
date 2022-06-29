const sessions = require("express-session");
const { validationResult } = require("express-validator");
// const { encryptData, decryptData } = require("../lib/modules");
const { userHomePage } = require('./authController')
const conn = require("../config/DB_Connection");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

module.exports = {
  homePage: (req, res, next) => {
    try {
      var query =
        "SELECT * FROM tour INNER JOIN address ON tour.tour_id = address.tour_id ";
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
        if (req.query.searchBy) {
          userHomePage(req, res, next, result, { filter: true });
        } else {
          userHomePage(req, res, next, result, { filter: false });
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  userLoginPage: (req, res) => {
    return res.render("auth/loginPage", { error: null });
  },
  detail: (req, res) => {
    const id = req.query.tour_id;
    sql =
      "SELECT * FROM tour INNER JOIN address ON tour.tour_id = address.tour_id WHERE tour.tour_id=?";
    sql1 = "SELECT * FROM review WHERE tour_id=? ORDER BY id DESC LIMIT 4;";
    count = "SELECT COUNT(*) FROM booking WHERE tour_id=?;";
    const query = "SELECT * FROM `user` where `user_id`=?;";
    conn.query(sql, id, function (err, result, fields) {
      if (err) throw err;
      conn.query(sql1, id, function (err, result2, fields) {
        if (err) throw err;
        conn.query(count, id, async function (err, count, fields) {
          if (err) throw err;
          if (req.cookies.jwt) {
            const decoded = await promisify(jwt.verify)(
              req.cookies.jwt,
              process.env.JWT_SECRET
            );
            try {
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
                  bookedAlready: false,
                });
              });
            } catch (err) {
              next(err);
            }
          } else {
            res.render("pages/detail", {
              result,
              result2,
              count,
              isLogged: false,
            });
          }
        });
      });
    });
  },
  
  userSignupPage: async (req, res, next) => {
    return res.render("auth/signupPage", { error: null });
  },

  dashBoardPage: (req, res) => {},

  userProfilePage: (req, res, next) => {
    user = req.user;
    if (user.role == "admin") {
      const query =
        "select * from `tour` inner join `booking` on booking.tour_id=tour.tour_id where booking.user_id=?;";
      try {
        conn.query(query, user.user_id, (err, result) => {
          if (err) {
            console.log(err);
            return res.redirect("/error");
          }
          return res.render("pages/profilePage", {
            user,
            tours: result,
            message: "",
          });
        });
      } catch (err) {
        next(err);
      }
    } 
    
    else {
      let query =
        "SELECT * FROM tour INNER JOIN address ON tour.tour_id = address.tour_id";
      let query2 = "SELECT COUNT(*) AS count FROM booking;";
      conn.query(query, (err, result) => {
        if (err) {
          console.log(err);
          return res.redirect("/error");
        }
        conn.query(query2, (err, result2) => {
          if (err) {
            console.log(err);
            return res.redirect("/error");
          }
          //  console.log(result);
          let counts = [];
          for (i = 0; i <= 12; i++) {
            query = "SELECT * from `booking` where month(Created_at) = ?";
            conn.query(query, i, (error, resu) => {
              if (err) {
                console.log(err);
                return res.redirect("/error");
              }
              counts.push(resu.length);
            });
          }
          const dataPoints = [
            { label: "Jan", y: counts[0] },
            { label: "Feb", y: counts[1] },
            { label: "Mar", y: counts[2] },
            { label: "Apr", y: counts[3] },
            { label: "May", y: counts[4] },
            { label: "June", y: counts[5] },
            { label: "July", y: counts[6] },
            { label: "Aug", y: counts[7] },
            { label: "Sept", y: counts[8] },
            { label: "Oct", y: counts[9] },
            { label: "Nov", y: counts[10] },
            { label: "Dec", y: counts[11] },
          ];
          const sqln =
            "SELECT * FROM booking INNER JOIN address ON booking.tour_id = address.tour_id WHERE direction = 'North'";
          const sqls =
            "SELECT * FROM booking INNER JOIN address ON booking.tour_id = address.tour_id WHERE direction = 'South'";
          const sqle =
            "SELECT * FROM booking INNER JOIN address ON booking.tour_id = address.tour_id WHERE direction = 'East'";
          const sqlc =
            "SELECT * FROM booking INNER JOIN address ON booking.tour_id = address.tour_id WHERE direction = 'Center'";
          const sqlw =
            "SELECT * FROM booking INNER JOIN address ON booking.tour_id = address.tour_id WHERE direction = 'West'";
         let resultn;
         let results;
         let resulte;
         let resultw;
         let resultc;
           conn.query (sqln,  (er, resu)=>{
            if (er) console.log(err);
           resultn = resu;
           conn.query(sqls, (er, resu) => {
             if (er) console.log(err);
             results = resu;
               conn.query(sqls, (er, resu) => {
                 if (er) console.log(err);
                 results = resu;
                      conn.query(sqle, (er, resu) => {
                        if (er) console.log(err);
                        resulte = resu;
                       conn.query(sqlw, (er, resu) => {
                         if (er) console.log(err);
                         resultw = resu;
                         conn.query(sqlc, (er, resu) => {
                           if (er) console.log(err);
                           resultc = resu;

                           const cntn = resultn.length;
                           const cnts = results.length;
                           const cnte = resulte.length;
                           const cntw = resultw.length;
                           const cntc = resultc.length;
                             const dataPoints1 = [
                            { label: "North", y: cntn },
                            { label: "South", y: cnts },
                            { label: "East", y: cnte },
                            { label: "West", y: cntw },
                            { label: "Center", y: cntc },
                                               ];
          console.log(dataPoints1);
          
          return res.render("pages/dashboard", {
            user,
            result,
            result2,
            dataPoints,
            dataPoints1,
          });
                         });
          

                       });
                      });
                  });
               });
           
            });

       
       
      })}
        )}
      },
  

    userSignupPage: async(req, res, next)=>{
        return res.render('auth/signupPage', {error: null})
    },
   
   
  
  editProfile: (req, res, next) => {
    const { user } = req;
    const { body } = req;
    let query =
      "select * from `tour` inner join `booking` on booking.tour_id=tour.tour_id where booking.user_id=?;";
    try {
      conn.query(query, user.user_id, (err, result) => {
        if (err) {
          console.log(err);
          return res.redirect("/error");
        }
        query =
          "update `user` set `first_name`=?, `last_name`=?, `phone_number`=? where user_id=?;";
        const error = validationResult(req);
        if (!error.isEmpty()) {
          return res.render("pages/profilePage", {
            user,
            tours: result,
            message: error.array()[0].msg,
          });
        }
        conn.query(
          query,
          [body.first_name, body.last_name, body.phone, user.user_id],
          (err, rows) => {
            if (err) {
              console.log(err);
              return res.redirect("/error");
            }
            if (rows.affectedRows < 1) {
              return res.render("pages/profilePage", {
                user,
                tours: result,
                message: "Unable to update profile, Try again",
              });
            }
            user.first_name = body.first_name;
            user.last_name = body.last_name;
            user.phone_number = body.phone;
            return res.render("pages/profilePage", {
              user,
              tours: result,
              message: "successfully edited profile",
            });
          }
        );
      });
    } catch (err) {
      next(err);
    }
  },
  // addTourPage: async (req, res) => {},
 
  // editProfile: (req, res, next)=>{
  //     const { user } = req
  //     const {body} = req
  //     let query = 'select * from `tour` inner join `booking` on booking.tour_id=tour.tour_id where booking.user_id=?;'
  //     try{
  //       conn.query(query, user.user_id, (err, result)=>{
  //         if(err){
  //           console.log(err)
  //           return res.redirect('/error')
  //         }
  //         query = 'update `user` set `first_name`=?, `last_name`=?, `phone_number`=? where user_id=?;'
  //         const error = validationResult(req)
  //         if(!error.isEmpty()){
  //           return res.render('pages/profilePage', { user, tours: result, message: error.array()[0].msg})
  //         }
  //         conn.query(query, [body.first_name, body.last_name, body.phone, user.user_id], (err, rows)=>{
  //           if(err){
  //             console.log(err)
  //             return res.redirect('/error')
  //           }
  //           if(rows.affectedRows < 1){
  //             return res.render('pages/profilePage', { user, tours: result, message: 'Unable to update profile, Try again'})
  //           }
  //           user.first_name = body.first_name
  //           user.last_name = body.last_name
  //           user.phone_number = body.phone
  //           return res.render('pages/profilePage', { user, tours: result, message: 'successfully edited profile'})
  //         })
  //       })
  //     }catch(err){
  //       next(err)
  //     }
  //   },
    addTourPage: async(req,res)=>{
      return res.render('admin/addTour', {error: null})
    },
    editTourPage: async(req,res)=>{

      const tourId = req.params.tourId;
          sql =`SELECT * FROM tour INNER JOIN address ON tour.tour_id = address.tour_id WHERE tour.tour_id= ${tourId}`;
          console.log(tourId)
          conn.query(sql, (error, tours)=>{
            if(error){
              console.log(error.message);
               return res.render('pages/error',{errorMessage:error.sqlMessage});
            } 
            else{
              return res.render('admin/editTour', {tour: tours[0], error: null,isLogged:true,user:req.user})
            }
          })
        },
        forgotPassword: (req, res, next)=>{
          res.render('pages/resetpassPage', {message: "Enter your email address and we'll send you an email with instructions to reset your password."})
    },

    // errorPage: async(req,res)=>{
    //   return res.render('pages/404');
    // }
    exportTour:async(req,res)=>{
      var sql = `SELECT * FROM tour INNER JOIN address ON tour.tour_id = address.tour_id `;
      conn.query(sql, (error, tours)=>{
        if(error){
          console.log(error.message);
           return res.render('pages/error',{errorMessage:error.sqlMessage});
        } 
        else{
          console.log(tours)
          return res.render('admin/exportTour', {tours})
        }
      })
    }
}

