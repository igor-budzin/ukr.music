const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/user.model.js');
const validateLoginInput = require('../auth/login');

module.exports = (router) => {
  router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
      return res.status(404).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    UserModel.findOne({email})
      .then(user => {
        if(!user) {
          return res.status(404).json({
            status: false,
            message: 'Incorrect Password or Login'
          });
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
                    status: true,
                    token: `Bearer ${token}`
                  });
                }
              });
            }
            else {
              return res.status(404).json({
                status: false,
                message: 'Incorrect Password or Login'
              });
            }
          });
      });
  });
}