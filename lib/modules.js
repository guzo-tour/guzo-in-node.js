const bcrypt = require('bcrypt')

const saltRounds = 10

module.exports = {
    encryptPass(pass){
        return bcrypt.hash(pass, saltRounds);
    },
    decryptPass(pass, hash){
        return bcrypt.compare(pass, hash)
    }
}