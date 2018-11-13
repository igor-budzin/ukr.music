const fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors'); 
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const privateKey  = fs.readFileSync('api/ssl/apache.key', 'utf8');
const certificate = fs.readFileSync('api/ssl/apache.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate, passphrase: 'local'};

const routes = require('./routes');

// Middlewares
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 8080;
const router = express.Router();

app.use('/api', router);

router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});


routes(app, router);

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(port);
console.log('Magic happens on port ' + port);
