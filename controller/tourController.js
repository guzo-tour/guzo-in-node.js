const sessions = require("express-session");
const conn = require("../config/DB_Connection");
const { validationRules } = require("express");

module.exports = {
  homePage: (req, res) => {
    const sql =
      "SELECT * FROM tour INNER JOIN address ON tour.tour_id = address.tour_id";
    const data = conn.query(sql,function (err, result, fields) {
    if (err) throw err;
        res.render("pages/index", {result});
        console.log(result[0])

});
  },
};
