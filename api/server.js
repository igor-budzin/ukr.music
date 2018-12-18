const fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();

const cors = require('cors'); 
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const privateKey  = fs.readFileSync('api/ssl/apache.key', 'utf8');
const certificate = fs.readFileSync('api/ssl/apache.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate, passphrase: 'local'};

const routes = require('./routes');

require('./config/passport')(passport);

// Middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// required for passport
app.use(session({ secret: 'cabineofpilot' }));
app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 8080;
const router = express.Router();

app.use('/api', router);

router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

routes(router, passport);

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(port);
console.log('Magic happens on port ' + port);
