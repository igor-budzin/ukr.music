const mongoose = require('mongoose');

const uploadAudio = require('./routes/uploadAudio.route');
const getAllMusic = require('./routes/getAllMusic.route');
const getMusic = require('./routes/getMusic.route');

mongoose.connect('mongodb://localhost/musicDB', { useNewUrlParser: true }, (err) => {
	if(err) throw err;
	console.log('Connected to musicDB')
});


module.exports = (router, passport) => {

	uploadAudio(router);
	getAllMusic(router);
	getMusic(router);

	router.get('/auth/facebook', passport.authenticate('facebook', { 
		scope: ['public_profile', 'email']
	}));

	router.get('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect: 'https://localhost:3000/music',
		failureRedirect: '/'
	}));

	router.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

};

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated())
		return next();

	res.redirect('/');
}

