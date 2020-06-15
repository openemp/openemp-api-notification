const jwt = require('jsonwebtoken');
require('dotenv').config()

const SECRET_KEY = process.env.JWT_SECRET;

function verifyToken(jwtToken) {
    try{
        return jwt.verify(jwtToken, SECRET_KEY);
    }catch(e){
        console.log('e:',e);
        return null;
    }
}

module.exports = {verifyToken};
