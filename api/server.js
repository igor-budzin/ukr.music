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
const MongoStore = require('connect-mongodb-session')(session)

const privateKey  = fs.readFileSync('api/ssl/apache.key', 'utf8');
const certificate = fs.readFileSync('api/ssl/apache.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate, passphrase: 'local'};

const routes = require('./routes');

const httpsServer = https.createServer(credentials, app);

const socket = require('socket.io')(httpsServer);

// required for passport
app.use(passport.initialize());
require('./auth/passport')(passport);

// Middlewares
app.use(morgan('dev'));
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

routes(router, socket);



httpsServer.listen(port);
console.log('Magic happens on port ' + port);