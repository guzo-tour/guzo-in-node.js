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
  displayAddTour : (req, res, next) => {
    res.render('pages/addTour', {
      
    })
},
  addTour : (req, res, next) => {
   const  tour_name = req.body.tour_name;
    const   duration = req.body.duration
      const group_size =req.body.group_size
     const  difficulty=req.body.difficulty
    const region=req.body.region
    const   direction=req.body.direction
      const town=req.body.town
    const  price=req.body.price
   const    price_discount=req.body.discount_price
      const start=req.body.start_date
      const start_date = start.toString();
       const summary=req.body.summary
       const summary_description=req.body.description
      
  
  const sql = `INSERT INTO tour (tour_name, duration, difficulty, group_size, price, discount, summary, descriptions, start_date) 
                VALUES ("${tour_name}", "${duration}", "${difficulty}", "${group_size}","${price}","${price_discount}","${summary}","${summary_description}","${start_date}")`;
  const sql2 = `INSERT INTO address (tour_id ,region, direction, town) VALUES (LAST_INSERT_ID(),"${region}","${direction}","${town}")`;              
  conn.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record inserted');
  });
  conn.query(sql2,(err, result)=>{
      if(err) throw err;
      console.log("record inserted");
  })
}
};
