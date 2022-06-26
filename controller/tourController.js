const sessions = require("express-session");
const conn = require("../config/DB_Connection");
const { validationRules } = require("express");

module.exports.tourController = {
  homePage: (req, res) => {
    const sql =
      "SELECT * FROM tour INNER JOIN address ON tour.tour_id = address.tour_id";
    const data = conn.query(sql);
    console.log(data);

    return res.render("pages/index");
  },
};
