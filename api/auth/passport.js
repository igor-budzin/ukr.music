const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const authConfig = require('../config/auth');

const UserModel = require('../models/user.model');
const opts = {};

var GoogleTokenStrategy = require('passport-google-token').Strategy

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

module.exports = passport => {
	// passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
	// 	UserModel.findById(jwt_payload.id)
	// 		.then(user => {
	// 			if(user) {
	// 				return done(null, user);
	// 			}
	// 			return done(null, false);
	// 		})
	// 		.catch(err => console.error(err));
	// }));


	passport.use(new GoogleStrategy({
	    clientID: authConfig.googleAuth.clientID,
	    clientSecret: authConfig.googleAuth.clientSecret,
	    callbackURL: authConfig.googleAuth.callbackURL
	  },
	  (accessToken, refreshToken, profile, cb) => {
	    UserModel.findOneOrCreate({ googleId: profile.id }, (err, user) => {
	      return cb(err, user);
	    });
	  }
	));


// 	passport.use(new GoogleTokenStrategy({
//     clientID: authConfig.googleAuth.clientID,
//     clientSecret: authConfig.googleAuth.clientSecret,
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOneOrCreate({ googleId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));
}