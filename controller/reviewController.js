const sessions = require("express-session");
const conn = require("../config/DB_Connection");
const { validationRules } = require("express");

module.exports = {
  giveReview: async(req,res)=>{
    const review = req.body.review;
    const rating = req.body.rating
    const userId = req.user.user_id;
    const tourId = req.params.tourId;
    
    const query = "inset into review(user_id,tour_id, review, rating) values(?,?,?,?)";
    conn.query(query, [userId,tourId, review,rating], (error, row)=>{
        if(error){
           throw error; 
        } 
    })   
  },
  editReview: async(req,res)=>{
    const review = req.body.review;
    const rating = req.body.rating
    const userId = req.user.user_id;
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

