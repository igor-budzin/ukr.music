const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken');

const generateAccessToken = userId => {
  const token = jwt.sign({}, authConfig.jwt.secretOrKey, {
    expiresIn: authConfig.jwt.expires,
    audience: authConfig.jwt.audience,
    issuer: authConfig.jwt.issuer,
    subject: userId.toString()
  });

  return token;
}

module.exports = generateAccessToken;