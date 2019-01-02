const mongoose = require('mongoose');
const path =  require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('./auth/register');
const validateLoginInput = require('./auth/login');

const uploadAudio = require('./routes/uploadAudio.route');
const getMusic = require('./routes/getMusic.route');

const UserModel = require('./models/user.model');
const AudioModel = require('./models/uploadAudio.model');

mongoose.connect('mongodb://localhost/musicDB', { useNewUrlParser: true }, (err) => {
	if(err) throw err;
	console.log('Connected to musicDB')
});


module.exports = (router, passport) => {

	router.post('/register', function(req, res) {

		const { errors, isValid } = validateRegisterInput(req.body);

		if(!isValid) {
			return res.status(400).json(errors);
		}
		UserModel.findOne({
			email: req.body.email
		}).then(user => {
			if(user) {
				return res.status(400).json({
					email: 'Email already exists'
				});
			}
			else {
				const newUser = new UserModel({
					name: req.body.name,
					email: req.body.email,
					password: req.body.password,
					avatar: 'https://localhost:8080/api/image/boy.svg'
				});
				
				bcrypt.genSalt(10, (err, salt) => {
					if(err) console.error('There was an error', err);
					else {
						bcrypt.hash(newUser.password, salt, (err, hash) => {
							if(err) console.error('There was an error', err);
							else {
								newUser.password = hash;
								newUser
									.save()
									.then(user => {
										res.json(user)
									}); 
							}
						});
					}
				});
			}
		});
	});

	router.post('/login', (req, res) => {

		const { errors, isValid } = validateLoginInput(req.body);

		if(!isValid) {
			return res.status(400).json(errors);
		}

		const email = req.body.email;
		const password = req.body.password;

		UserModel.findOne({email})
			.then(user => {
				if(!user) {
					errors.email = 'User not found'
					return res.status(404).json(errors);
				}
				bcrypt.compare(password, user.password)
						.then(isMatch => {
							if(isMatch) {
								const payload = {
									id: user.id,
									name: user.name,
									avatar: user.avatar
								}
								jwt.sign(payload, 'secret', {
									expiresIn: 86400
								}, (err, token) => {
									if(err) console.error('There is some error in token', err);
									else {
										res.json({
											success: true,
											token: `Bearer ${token}`
										});
									}
								});
							}
							else {
								errors.password = 'Incorrect Password';
								return res.status(400).json(errors);
							}
						});
			});
	});

	router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
		return res.json({
			id: req.user.id,
			name: req.user.name,
			email: req.user.email
		});
	});

	uploadAudio(router);
	getMusic(router);

	router.get('/albumCover/:link', (req, res) => {
		const filesPath = path.join(__dirname, '..', 'files', 'artist-album', req.params.link);
		res.sendFile(filesPath);
	});

	router.get('/image/:link', (req, res) => {
		const filesPath = path.join(__dirname, '..', 'files', 'image', req.params.link);
		res.sendFile(filesPath);
	});

	router.get('/get-music/:user', (req, res) => {
		UserModel.findById(req.params.user, 'audio', function(err, user) {
			if(err) {
				res.json({ 'status': 'error' });
				return;
			}

			AudioModel.find({ _id: { $in: user.audio }}, '_id link title artists duration picture').exec().then((result) => {
				res.json(result);
			});
		});
	});

	router.get('/getUserData/:user', (req, res) => {
		UserModel.aggregate()
			.match({ _id: mongoose.Types.ObjectId(req.params.user) })
			.project({
				audioCount: { $size:"$audio" },
				followersCount: { $size:"$followers" }
			})
			.exec(function(err, user) {
				if(err) {
					console.log(err);
					res.json({ 'status': 'error' });
				}
				else res.json(user[0]);
			});
	});

	router.get('/getUserFollows/:user', (req, res) => {
		UserModel.findById(req.params.user, 'follows', (err, data) => {
			if(err) console.log(err);
			
			const ids = data.follows.map(function(el) { return mongoose.Types.ObjectId(el) });

			UserModel.aggregate([
				{ $match: { "_id": { "$in": ids } } },
				{
					$project: {
						_id: '$_id',
						name: '$name',
						avatar: '$avatar',
						audioCount: { $size:"$audio" },
						followsCount: { $size:"$follows" }
					}
				}
			],
			(err, docs) => {
				if(err) console.log(err);
				else {
					res.json(docs)
				}
			});
		});
	});

	// router.get('/get-music/:user/:limit', (req, res, next) => {
	// 	User.findById(req.params.user, 'audio').limit(req.params.limit).exec(function(err, user) {
	// 		if(err) console.log(err);
	// 		console.log(user)

	// 		AudioModel.find({ _id: { $in: user.audio }}, '_id link title artists duration picture').exec().then((result) => {
	// 			res.json(result);
	// 		});
	// 	})
	// });

};
