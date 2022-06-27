
const conn = require("../config/DB_Connection");
const { validationRules } = require("express");

module.exports = {
  book: async(req,res)=>{
    const userId = req.user.userId;
    const tourId = req.params.tourId;
    const query = "inset into booking(user_id,tour_id) values(?,?)";
    conn.query(query, [userId,tourId], (error, row)=>{
        if(error){
           throw error; 
        } 
    })  
  },
  unbook: async(req,res)=>{
    const userId = req.user.userId;
    const tourId = req.params.tourId;
    const query = "delete from booking where user_id = ? and tour_id = ?";
    conn.query(query, [userId,tourId], (error, row)=>{
        if(error){
           throw error; 
        } 
    })  
  }
}

