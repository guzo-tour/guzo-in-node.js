const bcrypt = require('bcrypt')

const saltRounds = 10

module.exports = {
    encryptData(pass){
        return bcrypt.hash(pass, saltRounds);
    },
    decryptData(pass, hash){
        return bcrypt.compare(pass, hash)
    }
}