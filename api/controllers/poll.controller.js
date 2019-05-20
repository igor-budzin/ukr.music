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
      console.log(count)
      Poll
        .aggregate([
          { $match: { active: true }},
          { $skip: random },
          { $limit: 1 },
          { 
            $project: {
              "alias": "$alias",
              "title": "$title",
              "answer": "$answer",

            }
          }
        ])
        .then(result => {
          console.log(result)
          res.json(result[0]);
        })
    });

  Poll
    // .aggregate([
    //   { $sample: { size: 1 }},
    //   { $match: { "voters": { "$ne": user }}},
      
    // ])
    // .then(result => {
    //   result[0].answered = false;
    //   console.log(result[0])
    //   // res.json(result[0]);
    // })
    // .catch(next);
}

/**
  POST /poll/vote
 */
exports.pollVote = (req, res, next) => {
  const { alias, answer, user } = req.body;

  Poll
    .findOneAndUpdate(
      { alias },
      { $push: { voters: user }}
    )
    .then(result => {
      result.answered = true;
      res.json(result);
    })
    .catch(next);
}