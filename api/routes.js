const mongoose = require('mongoose');
const config = require('./config/main.config');

const mongoQuery = process.env.NODE_ENV === 'production' ? 
`mongodb://${config.mongo_main_user}:${config.mongo_main_pass}@127.0.0.1:27017/${config.mongo_main_db}` :
'mongodb://localhost/musicDB';

const mongoParams = {
  useNewUrlParser: true,
};

mongoose.connect(mongoQuery, mongoParams, (err) => {
  if(err) throw err;
  console.log('Connected to musicDB');
});

module.exports = (router, socket) => {

  require('./routes/register.route')(router); // Реєстрація
  require('./routes/login.route')(router); // Авторизація

  require('./routes/static/image.route')(router); // Зображення з кореню

  require('./routes/getMusic.route')(router); // Список треків
  require('./routes/getAudioData.route')(router); // Інформація про трек

  require('./routes/getUserData.route')(router); // Інформація про юзера (кількість треків і підписників)
  require('./routes/getUserFollows.route')(router); // Список користувачів на яких підписаний юзер
  require('./routes/followUser.route')(router); // Підписується на користувача


  /*------------------------------------------------------------*/

  require('./routes/music/getMusicList.route')(router); // Список треків

  require('./routes/files/uploadAudioFiles.route')(router, socket); // Завантаження аудіофайлів
  require('./routes/files/getAudioFile.route')(router); // Аудіофайл

  require('./routes/playlist/playlist.route')(router);
  require('./routes/cover/cover.route')(router);
  require('./routes/artist/artist.route')(router);
  require('./routes/user/user.route')(router);
  require('./routes/collection/collection.route')(router);
  require('./routes/audio/audio.route')(router);
};
