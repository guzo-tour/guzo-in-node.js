const fs = require('fs');
const conn = require("../config/DB_Connection");

const getData = async()=>{
    let data = "";
    let query = 'select * from `tour` inner join `address` on tour.tour_id = address.tour_id ';
    conn.query(query, (error, result)=>{
        if(error)throw error;
        data = result;
    })
    return data;
}

const writeToFile = async()=>{
    const data = await getData();
    fs.writeFile("../public/files/tour.pdf",'utp-8', data, (error)=>{
        if(error)throw error
        else console.log("The writed succesffuly");
    })
}

const downLoad = async(req,res)=>{
    
}


