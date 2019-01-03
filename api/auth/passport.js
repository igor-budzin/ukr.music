const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const UserModel = require('../models/user.model');
const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

module.exports = passport => {
	passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
		UserModel.findById(jwt_payload.id)
			.then(user => {
				if(user) {
					return done(null, user);
				}
				return done(null, false);
			})
			.catch(err => console.error(err));
	}));
}