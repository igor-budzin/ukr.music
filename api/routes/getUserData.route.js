const mongoose = require('mongoose');
const UserModel = require('../models/user.model.js');

module.exports = (router) => {
  router.post('/getUserData', (req, res, next) => {
    if(!req.body.currentUserId || !req.body.userId) {
      res.status(500).send({ 'status': 'error' });
      return false;
    }

    UserModel
      .aggregate()
      .match({ id: req.body.userId })
      .project({
        id: '$id',
        audioCount: { $size:"$audio" },
        followersCount: { $size:"$followers" }
      })
      .exec(function(err, user) {
        if(err) next(err);
        
        UserModel
          .aggregate()
          .match({ id: req.body.currentUserId })
          .project({ follows: '$follows' })
          .match({ "follows": { '$in': [user[0].id] } })
          .project({ canFollowUser: { $size: "$follows" } })
          .exec((err, docs) => {
            if(err) next(err);

            user[0].canFollowUser = docs.length ? false : true
            res.json(user[0]);
          });
      });
  });
}