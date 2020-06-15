const jwt = require('jsonwebtoken');
var assert = require('assert');
const {verifyToken} = require('./../src/utils/jwt_auth')

require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET;

describe("Test JWT Authorization", function(){
    const token = jwt.sign({uuid: "d290f1ee-6c54-4b01-90e6-d701748f0851"}, SECRET_KEY);
    it("returns true", function() {
        console.log(token)
        console.log(verifyToken(token))
       assert.strictEqual( verifyToken(token).uuid,  "d290f1ee-6c54-4b01-90e6-d701748f0851")
    });
})