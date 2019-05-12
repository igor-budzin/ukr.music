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
  DELETE /poll/:id
 */
exports.deletePoll = (req, res, next) => {
  const { alias } = this.query;

  Poll
    .deleteOne({ alias })
    .then(result => {
      console.log(result);
    })
    .catch(next);
}
