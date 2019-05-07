const controller = require('../../controllers/collection.controller');
const passport = require('passport');

module.exports = router => {
  router
    .get('/collection', controller.getAllCollections)
    .get('/collection/:id', controller.getCollection)
    .post('/collection', controller.createCollection)
}