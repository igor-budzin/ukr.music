const mongoose = require('mongoose');

const uploadAudio = require('./routes/uploadAudio.route');
const getAllMusic = require('./routes/getAllMusic.route');
const getMusic = require('./routes/getMusic.route');

mongoose.connect('mongodb://localhost/musicDB', { useNewUrlParser: true }, (err) => {
	if(err) throw err;
	console.log('Connected to musicDB')
});


module.exports = (app, router) => {

	uploadAudio(app, router);
	getAllMusic(app, router);
	getMusic(app, router);

}


