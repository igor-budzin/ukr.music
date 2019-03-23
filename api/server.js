const fs = require('fs');
const http = require('http');
const express = require('express');
const app = express();

const cors = require('cors'); 
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const MongoStore = require('connect-mongodb-session')(session)

const privateKey  = fs.readFileSync('api/ssl/apache.key', 'utf8');
const certificate = fs.readFileSync('api/ssl/apache.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate, passphrase: 'local'};

const routes = require('./routes');

const httpServer = http.createServer(app);

const socket = require('socket.io')(httpServer);

global.__root = __dirname;


// Middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(cors());

// required for passport
app.use(passport.initialize());
app.use(passport.session());
require('./auth/passport')(passport);

const port = process.env.PORT || 8080;
const router = express.Router();

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use('/api', router);

router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

routes(router, socket);

// Generate an Access Token for the given User ID
function generateAccessToken(userId) {
  // How long will the token be valid for
  const expiresIn = '1 hour';
  // Which service issued the token
  const issuer = 'social-logins-spa';
  // Which service is the token intended for
  const audience = 'social-logins-spa';
  // The signing key for signing the token
  const secret = 'mySuperSecretKey';

  const token = jwt.sign({}, secret, {
    expiresIn: expiresIn,
    audience: audience,
    issuer: issuer,
    subject: userId.toString()
  });

  return token;
}





// passport.authenticate('google', { scope: ['profile'] })
router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // console.log(req.session)
    // Successful authentication, redirect home.
       var responseHTML = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>'
    responseHTML = responseHTML.replace('%value%', JSON.stringify({
        user: req.user,
        accessToken: generateAccessToken(req.user.googleId)
    }));
    res.status(200).send(responseHTML);
    // res.redirect('/');
  });


// router.get('/auth/google/token', passport.authenticate('google-token'),
//  function(req, res) {
//   res.send(req.user);
// });

app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({
		'status': 'error'
	});
});

httpServer.listen(port);
console.log('Magic happens on port ' + port);