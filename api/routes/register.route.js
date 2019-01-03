const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserModel = require('../models/user.model.js');
const validateRegisterInput = require('../auth/register');

module.exports = (router) => {
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
}