const jwt = require('jsonwebtoken');
var assert = require('assert');
const {verifyToken} = require('./../src/utils/jwt_auth')
const {JWT_SECRET_KEY} = require("./../src/utils/constant")

describe("Test JWT Authorization", function () {
    it("returns true", function () {
        const token = jwt.sign({uuid: "d290f1ee-6c54-4b01-90e6-d701748f0851"}, JWT_SECRET_KEY);
        assert.strictEqual(verifyToken(token).uuid, "d290f1ee-6c54-4b01-90e6-d701748f0851")
    });
})