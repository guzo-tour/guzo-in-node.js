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
    

}