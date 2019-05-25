const mongoose = require('mongoose');
const multiparty = require('multiparty');
const fs = require('fs');
const path = require('path');
const translit = require("cyrillic-to-translit-js");

const User = require('../models/user.model');
const Poll = require('../models/Poll.model');

/**
  GET /poll
 */
exports.getAllPolls = (req, res, next) => {
  let { page, limit, sortBy } = req.query;

  page = page ? parseInt(page, 10) : 1;
  limit = limit ? parseInt(limit, 10) : 30;

  const options = {
     sort: sortBy ? { [sortBy]: -1 } : { date: 1 },
     page,
     limit
   };

  Poll
    .paginate({}, options)
    .then(result => {
      res.json({ poll: result.docs.length ? result.docs : [] });
    })
    .catch(next);
}

/**
  POST /poll
 */
exports.createPoll = (req, res, next) => {
  const { title, answer, publish } = req.body;
  const pollId = new mongoose.Types.ObjectId();

  const poll = new Poll({
    title,
    answer,
    publish,
    _id: pollId,
    alias: translit({ preset: "uk" }).transform(title, "_") + '_' + Date.now()
  });

  poll
    .save()
    .then(result => res.json({ status: true, poll: result }))
    .catch(next);
}

/**
  DELETE /poll/:alias
 */
exports.deletePoll = (req, res, next) => {
  const { alias } = req.params;

  Poll
    .deleteOne({ alias })
    .then(result => {
      res.json({ status: true })
    })
    .catch(next);
}

/**
  GET /poll/random/:user
 */
exports.getRandomPoll = (req, res, next) => {
  const { user } = req.params;

  Poll
    .countDocuments({ active: true })
    .exec((err, count) => {
      const random = Math.floor(Math.random() * count);
      Poll
        .aggregate([
          { $match: { active: true }},
          { $skip: random },
          { $limit: 1 },
          { $project: {
            "alias": "$alias",
            "title": "$title",
            "answer": "$answer",
            "totalAnswersCount": "$totalAnswersCount",
            "voted":{
              $setIsSubset: [
                [ parseInt(user, 10) ],
                "$voters"
              ]
            }
          }}
        ])
        .then(result => {
          res.json(result[0]);
        })
    });
}

/**
  POST /poll/vote
 */
exports.pollVote = async (req, res, next) => {
  const { alias, answer, user } = req.body;
  let voted = false;

  await Poll
    .aggregate([
      { $match: { alias }},
      { $project: {
        "voted":{
          $setIsSubset: [
            [ parseInt(user, 10) ],
            "$voters"
          ]
        }
      }}
    ])
    .then(result => {
      voted = result[0].voted;
    })
    .catch(next);
    
  if(!voted) {
    Poll
      .findOneAndUpdate(
        {
          alias,
          "answer.id": parseInt(answer, 10)
        },
        {
          $push: { voters: user },
          $inc: {
            "answer.$.count": 1,
            "totalAnswersCount": 1
          },

        },
        { new: true }
      )
      .then(result => {
        res.json({
          title: result.title,
          alias: result.alias,
          totalAnswersCount: result.totalAnswersCount,
          answer: result.answer,
          voted: true
        });
      })
      .catch(next);
  }
  else next();

}