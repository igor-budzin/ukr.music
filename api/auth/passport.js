const mongoose = require('mongoose');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const authConfig = require('../config/auth');
const UserModel = require('../models/user.model');

const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = authConfig.jwt.secretOrKey;
opts.audience = authConfig.jwt.audience;
opts.issuer = authConfig.jwt.issuer;

module.exports = passport => {
  passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
    UserModel
      .findById(jwt_payload.id)
      .then(user => {
        if(user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => console.error(err));
  }));

  passport.use(new GoogleStrategy({
      clientID: authConfig.googleAuth.clientID,
      clientSecret: authConfig.googleAuth.clientSecret,
      callbackURL: authConfig.googleAuth.callbackURL
    },
    async (accessToken, refreshToken, profile, cb) => {
      let userObj = null;

      await UserModel
        .findOne({
          googleId: profile.id
        }, '_id login name googleId')
        .then(user => userObj = user)
        .catch(err => console.error(err));

      if(userObj) return cb(false, userObj);

      await UserModel
        .create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          photo: profile.photos[0].value,
          login: profile.emails[0].value.split('@')[0]
        })
        .then(user => cb(false, user))
        .catch(err => console.error(err));
    }
  ));

}


