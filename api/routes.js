const mongoose = require('mongoose');

const uploadAudio = require('./routes/uploadAudio.route');
const getAllMusic = require('./routes/getAllMusic.route');
const getMusic = require('./routes/getMusic.route');

mongoose.connect('mongodb://localhost/musicDB', { useNewUrlParser: true }, (err) => {
	if(err) throw err;
	console.log('Connected to musicDB')
});


module.exports = (router, passport) => {

	// auth middleware
	function isAuth(req, res, next) {
		if(!req.isAuthenticated()) {
			console.log('Не авторизований');
			return res.status(401).end();
		}
		console.log('Авторизований');
		next();
	}

	router.get('/auth', (req, res) => {
		if(!req.isAuthenticated())
		return res.status(401).end()

		res.json(req.user)
	});

	router.get('/auth/facebook', passport.authenticate('facebook'));

	router.get('/auth/facebook/callback', passport.authenticate(
		'facebook', 
		{ failureRedirect: 'https://localhost:3000/auth' }),
		(req, res) => {
			console.log('auth/facebook/callback')
			res.redirect('https://localhost:3000/music')
		}
	);

	router.get('/auth/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});


	uploadAudio(router);
	getAllMusic(router, isAuth);
	getMusic(router);
};
