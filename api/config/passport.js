const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const configAuth = require('./auth');

const User = require('../models/user.model');

module.exports = function(passport) {

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use(new FacebookStrategy({
		clientID: configAuth.facebookAuth.clientID,
		clientSecret: configAuth.facebookAuth.clientSecret,
		callbackURL: configAuth.facebookAuth.callbackURL
	},
	function(token, refreshToken, profile, done) {

		// asynchronous
		process.nextTick(function() {

			// find the user in the database based on their facebook id
			User.findOne({ 'facebook.id': profile.id }, function(err, user) {
				if (err) return done(err);

				// if the user is found, then log them in
				if(user) {
					return done(null, user); // user found, return that user
				}
				else {
					// if there is no user found with that facebook id, create them
					const newUser = new User();

					newUser.facebook.id = profile.id; 
					newUser.facebook.token = token;
					newUser.facebook.name = profile.displayName;

					newUser.save(function(err) {
						if(err) throw err;

						return done(null, newUser);
					});
				}

			});
		});

	}));

};