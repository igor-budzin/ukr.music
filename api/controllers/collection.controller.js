const mongoose = require('mongoose');
const multiparty = require('multiparty');
const fs = require('fs');
const path = require('path');

const User = require('../models/user.model');
const Collection = require('../models/Collection.model');

const coverFilesPath = path.resolve(__root, '..', '..', 'files', 'collection-cover');

/**
  GET /collection
 */
exports.getAllCollections = (req, res, next) => {
  let { page, limit, sortBy } = req.query;

  page = page ? parseInt(page, 10) : 1;
  limit = limit ? parseInt(limit, 10) : 30;

  const options = {
     sort: sortBy ? { [sortBy]: -1 } : { date: 1 },
     page,
     limit
   };

  Collection
    .paginate({}, options)
    .then(result => {
      res.json({ collections: result.docs.length ? result.docs : [] });
    })
    .catch(next);
}

/**
  GET /collection/:id
 */
exports.getCollection = (req, res, next) => {

}

/**
  POST /collection
 */
exports.createCollection = (req, res, next) => {
  let title, subtitle;
  let coverName = null;
  const _id = new mongoose.Types.ObjectId();
  const form = new multiparty.Form();

  form.on('error', next);

  form.on('field', (name, value) => {
    switch(name) {
      case 'title':
        title = value;
      break;

      case 'subtitle':
        subtitle = value;
      break;
    }
  });

  form.on('file', async (name, file) => {
    if(file.path) {
      const data = fs.readFileSync(file.path);

      const extArr = file.originalFilename.split('.');
      coverName = `${_id}.${extArr[extArr.length - 1]}`;

      fs.writeFileSync(path.resolve(coverFilesPath, coverName), data);
    }
  });

  form.on('close', async () => {
    const collection = new Collection({
      _id,
      title,
      subtitle,
      cover: coverName
    });

    await collection.save()
      .catch(err => next(err));

    res.send({ "status": "true" });
  });

  form.parse(req);
}