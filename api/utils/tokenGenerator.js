const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken');

const generateAccessToken = user => {
  const token = jwt.sign({ userData: user }, authConfig.jwt.secretOrKey, {
    expiresIn: authConfig.jwt.expires,
    audience: authConfig.jwt.audience,
    issuer: authConfig.jwt.issuer,
    subject: user.googleId.toString()
  });

  return token;
}

module.exports = generateAccessToken;