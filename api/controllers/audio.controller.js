const mongoose = require('mongoose');

const Audio = require('../models/Audio.model');
const User = require('../models/user.model');

/**
 * GET /audio
 */
exports.getAllAudio = async (req, res, next) => {
  let { page, limit, sortBy } = req.query;
  let countDocs = 0;

  page = page ? parseInt(page, 10) : 1;
  limit = limit ? parseInt(limit, 10) : 30;

  const options = {
     sort: sortBy ? { [sortBy]: -1 } : { date: 1 },
     page,
     limit
   };

  await Audio
    .countDocuments({})
    .then(count => countDocs = count)
    .catch(next);

  Audio
    .paginate({}, options)
    .then(result => {
      res.json({
        music: result.docs.length ? result.docs : [],
        count: countDocs,
        hasNextPage: countDocs > page * limit
      });
    })
    .catch(next);
}

/**
 * GET /audio/:id
 */
exports.getAudio = (req, res, next) => {
  const { id } = req.params;

  Audio
    .findById(id)
    .then(doc => res.json(doc))
    .catch(next);
}