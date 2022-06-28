require('dotenv').config()
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const saltRounds = 10
const { promisify } = require("util");

module.exports = {
    encryptData(pass){
        return bcrypt.hash(pass, saltRounds);
    },
    decryptData(pass, hash){
        return bcrypt.compare(pass, hash)
    },

    signToken : user => {
        return jwt.sign( user , process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
    },  
    sendEmail: (email, message, subject)=>{
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_ADDRESS_PASS
            }
        });
         
        let mailDetails = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: subject,
            text: message
        };
         
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log('Error Occurs');
                
            } else {
                console.log('Email sent successfully');
            }
        });
    }
}

 
 
