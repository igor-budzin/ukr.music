import fs from 'fs';
// import https from 'https';
import http from 'http';
const privateKey  = fs.readFileSync('api/ssl/apache.key', 'utf8');
const certificate = fs.readFileSync('api/ssl/apache.crt', 'utf8');
import express from 'express';
import colors  from 'colors';
import path    from 'path';
const credentials = {key: privateKey, cert: certificate, passphrase: 'local'};

// Server Side Rendering
import { renderPage, renderDevPage } from './ssr.js';

const PROD = process.env.NODE_ENV === 'production';
const port = 80;

const app = express();

if (PROD) {
	app.use('/static', express.static('build'));
	app.get('*', renderPage);
} else {
	const HMR = require('./hmr.js');
	// Hot Module Reloading
	HMR(app);
	app.get('*', renderDevPage);
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// development error handler
if (!PROD) {
	app.use(function(err, req, res, next) {
		console.error('error : ', err)
		res.status(err.status || 500);
	});
}

// production error handler
app.use(function(err, req, res, next) {
	console.error('error : ', err)
	res.status(err.status || 500);
});


const httpsServer = http.createServer(app);

httpsServer.listen(port, () => {
	 console.log(`${'Server listening:'.yellow} ${`http://localhost:${port}`.red}`);
 });
