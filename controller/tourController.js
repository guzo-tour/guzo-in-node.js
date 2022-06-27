const sessions = require("express-session");
const conn = require("../config/DB_Connection");
const { validationRules } = require("express");
module.exports = {
  addTour: async(req,res)=>{
    const tour_name = req.body.tour_name;
    const duration = req.body.duration
    const group_size =req.body.group_size
    const difficulty=req.body.difficulty
    const region=req.body.region
    const direction=req.body.direction
    const town=req.body.town
    const price=req.body.price
    const price_discount=req.body.discount_price
    const start=req.body.start_date
    const start_date = start.toString();
    const summary=req.body.summary
    const summary_description=req.body.description
    const sql = `INSERT INTO tour (tour_name, duration, difficulty, group_size, price, discount, summary, descriptions, start_date) 
                   VALUES ("${tour_name}", "${duration}", "${difficulty}", "${group_size}","${price}","${price_discount}","${summary}","${summary_description}","${start_date}")`;
    const sql2 = `INSERT INTO address (tour_id ,region, direction, town) VALUES (LAST_INSERT_ID(),"${region}","${direction}","${town}")`;              
    conn.query(sql, function(err, result) {
       if (err){
          throw err;
       } 
       else{
        conn.query(sql2,(err, result)=>{
          if(err) throw err;
          console.log("record inserted");
        })
      }
    })
  },
  editTour: async(req,res)=>{
    const tourName = req.body.tour_name;
    const duration = req.body.duration
    const group_size =req.body.group_size
    const price=req.body.price
    const price_discount=req.body.discount_price
		var query = `UPDATE tours SET 
						tour_name = "${first_name}", 
						duration = "${last_name}",  
						group_size = "${gender}" 
						price  = "${id}"
            discount = "${price_discount}"
            `
		conn.query(query, function(error, data){
			if(error)
			{
				throw error;
			}
			else
			{
				request.flash('success', 'Sample Data Updated');
				response.redirect('/sample_data');
			}
	});
  },
  deleteTour: async(req,res)=>{
    const tourId = req.params.tourId;
	  var query = `DELETE FROM tours WHERE tour_id = "${tourId}"`;
   	conn.query(query, function(error){

      if(error)
      {
        console.log(error);
        throw error;
      }
      else
      {
        req.flash('success', 'Tour has been deleted');
        res.redirect('../display');
      }

	  });
  }
}
    
