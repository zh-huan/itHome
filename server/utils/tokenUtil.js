const jwt = require("jsonwebtoken");
const {
    tokenConfig
} = require("../config/server.config.js")

function signToken(tokenInfo) {
    let token = jwt.sign(tokenInfo, tokenConfig.secret, {
        expiresIn: tokenConfig.expiresIn
    });
    return token;
}

async function verifyToken(token, callback) {
    let playload = await jwt.verify(token, tokenConfig.secret);
    return playload;
}

module.exports = {
    signToken,
    verifyToken
}