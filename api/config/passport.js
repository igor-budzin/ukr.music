// const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const configAuth = require('./auth');

const UserModel = require('../models/user.model');

function findOrCreateUser(provider, profile, done) {
	User.findOne({provider, providerId: profile.id}, (err, user2) => {
		if(err) return done(err);
		if(user2) return done(err, user);

		const user = new UserModel({
			username: profile.displayName,
			provider,
			providerId: profile.id
		});

		user.save(err => {
			if(err) console.log(err)
			return done(err, user)
		});
	});
}

module.exports = function(passport) {

	passport.use(new FacebookStrategy(configAuth.facebookAuth,
		(accessToken, refreshToken, profile, done) => {
			findOrCreateUser('facebook', profile, done)
		})
	);

};