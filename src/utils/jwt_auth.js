const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY} = require("./../utils/constant")



function verifyToken(jwtToken) {
    try{
        return jwt.verify(jwtToken, JWT_SECRET_KEY);
    }catch(e){
        console.log('e:',e);
        return null;
    }
}

module.exports = {verifyToken};
