require('dotenv').config()
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
// const { google } = require('googleapis')
const saltRounds = 10
const { promisify } = require("util");
// const CLIENT_ID = process.env.CLIENT_ID
        // const CLIENT_SECRET = process.env.CLIENT_SECRET
        // const REDIRECT_URL = process.env.REDIRECT_URL
        // const REFRESH_TOKEN = process.env.REFRESH_TOKEN

        // const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET)
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
    sendEmail: async(email, message, subject)=>{
        
        // oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})
        // const accessToken = await oAuth2Client.getAccessToken()
        let mailTransporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:465,
            secure:true,
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL_ADDRESS,
                // clientId: CLIENT_ID,
                // clientSecret: CLIENT_SECRET,
                // refreshToken: REFRESH_TOKEN,
                // accessToken: accessToken
            }
        });
         
        let mailDetails = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: subject,
            text: message
        };
         
        return mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log(err);
            } else {
                return {
                    isSent: true,
                    data
                }
            }
        });
    }
}

 
 
