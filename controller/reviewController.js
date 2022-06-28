const sessions = require("express-session");
const conn = require("../config/DB_Connection");
const { validationRules } = require("express");

module.exports = {
  giveReview: async(req,res)=>{
    const {body}=req;
    console.log(body);
    const tourId = req.query.tour_id;
    const query = "insert into review(user_id,tour_id, review, rating) values(?,?,?,?)";
    conn.query(
      query,
      [req.user.user_id, tourId, body.comments, body.rating1],
      (error, row) => {
        if (error) {
        return   res.redirect("/")
        }
         res.redirect("/");
      }
    );   
  },
  editReview: async(req,res)=>{
    const review = req.body.review;
    const rating = req.body.rating
    const userId = req.user.userId;
    const tourId = req.params.tourId;
    const query = "update review set review = ? , rating = ? where user_id = ? and tour_id = ? ";
    conn.query(query, [review,rating,userId,tourId], (error, row)=>{
        if(error){
           throw error; 
        } 
     

    })   
  },
  deleteReview: async(req,res)=>{
    const userId = req.user.userId;
    const tourId = req.params.tourId;
    const query = "delete from review where user_id = ? and tour_id = ?";
    conn.query(query, [userId,tourId], (error, row)=>{
        if(error){
            throw error
        }
    })
  }
}

