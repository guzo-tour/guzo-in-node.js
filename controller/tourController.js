const sessions = require("express-session");
const conn = require("../config/DB_Connection");
const { validationRules } = require("express");

module.exports = {
  homePage: (req, res) => {
    const sql =
      "SELECT * FROM tour INNER JOIN address ON tour.tour_id = address.tour_id";
    const data = conn.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.status(200);
      res.render("pages/index", { result });
    });
  },
  detail: (req, res) => {
    const id=req.query.tour_id;
    sql ="SELECT * FROM tour INNER JOIN address ON tour.tour_id = address.tour_id WHERE tour.tour_id=?";
    sql1 ="SELECT * FROM review WHERE tour_id=? ORDER BY id DESC LIMIT 4;";
     count = "SELECT COUNT(*) FROM booking WHERE tour_id=?;";
     conn.query(sql,id,function(err,result,fields){
        if (err) throw err;
        conn.query(sql1, id, function (err, result2, fields) {
         if (err) throw err;
           conn.query(count, id, function (err, count, fields) {
             if (err) throw err;
             res.render("pages/detail", { result, result2,count });
           });
       });
   
     })


    
  },
};
