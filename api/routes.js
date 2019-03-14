const mongoose = require('mongoose');
const config = require('./config/main.config');

const mongoQuery = process.env.NODE_ENV === 'prodaction' ? 
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
  require('./routes/static/albumCover.route')(router); // Обкладинка альбому

  require('./routes/getMusic.route')(router); // Список треків
  require('./routes/getAudioData.route')(router); // Інформація про трек

  require('./routes/getUserData.route')(router); // Інформація про юзера (кількість треків і підписників)
  require('./routes/getUserFollows.route')(router); // Список користувачів на яких підписаний юзер
  require('./routes/followUser.route')(router); // Підписується на користувача

  require('./routes/createArtist.route')(router); // Створює нового виконавця
  require('./routes/getArtistData.route')(router); // Інформація про виконавця

  require('./routes/getArtistMusicList.route')(router);
  require('./routes/getArtistList.route')(router);

  /*------------------------------------------------------------*/

  require('./routes/music/getMusicList.route')(router); // Список треків

  require('./routes/files/uploadAudioFiles.route')(router, socket); // Завантаження аудіофайлів
  require('./routes/files/getAudioFile.route')(router); // Аудіофайл
  require('./routes/files/getAudioCover.route')(router); // Обкладинка треку

};
