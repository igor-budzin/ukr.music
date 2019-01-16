const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/musicDB', { useNewUrlParser: true }, (err) => {
	if(err) throw err;
	console.log('Connected to musicDB')
});
 
module.exports = (router, passport) => {

	require('./routes/register.route')(router); // Реєстрація
	require('./routes/login.route')(router); // Авторизація

	require('./routes/static/image.route')(router); // Зображення з кореню
	require('./routes/static/albumCover.route')(router); // Обкладинка альбому
	require('./routes/static/getAudioFile.route')(router); // Аудіофайл

	require('./routes/uploadAudio.route')(router); // Завантаження аудіофайлів

	require('./routes/getMusic.route')(router); // Список треків
	require('./routes/getAudioData.route')(router); // Інформація про трек

	require('./routes/getUserData.route')(router); // Інформація про юзера (кількість треків і підписників)
	require('./routes/getUserFollows.route')(router); // Список користувачів на яких підписаний юзер
	require('./routes/followUser.route')(router); // Підписується на користувача

	require('./routes/createArtist.route')(router); // Створює нового виконавця
	require('./routes/getArtistData.route')(router); // Інформація про виконавця

};
