const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/user.model');
const validateRegisterInput = require('../auth/register');

const validateLoginInput = require('../auth/login');

exports.register = (req, res) => {
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
}

exports.login = (req, res) => {
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
}