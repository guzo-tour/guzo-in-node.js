const sessions = require("express-session");
const conn = require("../config/DB_Connection");
const { validationResult } = require('express-validator')
const { validationRules } = require("express");
module.exports = {
  addTour: async(req,res)=>{
    const error = validationResult(req)
        const { body } = req
        if (!error.isEmpty()) {
            console.log(error)
            return res.render('admin/addTour', {error: error.array()[0].msg
            }); 
        }
      
    
    const start=req.body.start_date
    const tour_name = req.body.tour_name;
    const duration = req.body.duration
    const group_size =req.body.group_size
    const difficulty=req.body.difficulty
    const region=req.body.region
    const direction=req.body.direction
    const town=req.body.town
    const price=req.body.price
    const price_discount=req.body.discount_price
    const start_date = "2022-10-09";
    const summary = req.body.summary
    const summary_description=req.body.description
    const sql = `INSERT INTO tour (tour_name, duration, difficulty, group_size, price, discount, summary, descriptions, start_date) 
                   VALUES ("${tour_name}", "${duration}", "${difficulty}", "${group_size}","${price}","${price_discount}","${summary}","${summary_description}","${start_date}")`;
    const sql2 = `INSERT INTO address (tour_id ,region, direction, town) VALUES (LAST_INSERT_ID(),"${region}","${direction}","${town}")`;              
    conn.query(sql, function(err, result) {
       if (error){
          console.log(error);
          return res.render('pages/404', {errorMessage:error.sqlMessage});
    
       } 
       else{
        conn.query(sql2,(err, result)=>{
          if (error){
        
            console.log(error);
            return res.render('pages/404',{errorMessage:error.sqlMessage});
          }
          else{
            //set cookie message and
            res.redirect("/detail")
          }
          
        })
      }
    })
  },
  editTour: async(req,res)=>{
   
    const error = validationResult(req)
    const { body } = req
    if (!error.isEmpty()) {
       console.log(error)
       const tourId = req.params.tourId;
       sql =`SELECT * FROM tour INNER JOIN address ON tour.tour_id = address.tour_id WHERE tour.tour_id= ${tourId}`;
       conn.query(sql, (err, tours)=>{
         if(err){
           console.log(err.message);
            return res.render('pages/error',{errorMessage:err.sqlMessage});
         } 
         else{
          console.log(tours[0]);
           return res.render('admin/editTour', {tour: tours[0], error:error.array()[0].msg, isLogged:true,user:req.user})
         }
       })
    }else{
        const tour_id = req.params.tourId;
        const tourName = req.body.tour_name;
        const duration = req.body.duration
        const group_size =req.body.group_size
        const price=req.body.price
        const price_discount=req.body.discount

        const summary = req.body.summary;
        const region = req.body.region
        const town = req.body.town

        var query = `UPDATE tour SET 
                tour_name = "${tourName}", 
                duration = "${duration}", 
                group_size = "${group_size}",
                price  = "${price}",
                discount = "${price_discount}",
                summary = "${summary}" where tour_id = ${tour_id}
                `
        conn.query(query, function(err, data){
          if(err){
            console.log(err);
            return res.render('pages/error', {errorMessage:err.sqlMessage});
          }
          else
          {
            const query2 = `update address set region = "${region}", town = "${town}" where tour_id = "${tour_id}"`;
            conn.query(query2, async(error, row)=>{
              if(error){
                console.log(error);
                return res.render('pages/error', {errorMessage:error.sqlMessage});
              }else{
                console.log("chwck")
                return res.render('pages/error', {errorMessage:"Check"});
              }
            })
          }
      });
    }

    
  },
  deleteTour: async(req,res)=>{
    const tourId = req.params.tourId;
	  var query = `DELETE FROM tours WHERE tour_id = "${tourId}"`;
   	conn.query(query, function(error){
      if(error)
      {
        console.log(error);
        return res.render('pages/404', {errorMessage:error.sqlMessage});
      }
      else
      {
        ///set cookie message
      }
      res.redirect('../adminProfile');
	  });
  }
}
    
