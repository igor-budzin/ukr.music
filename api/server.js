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

const MongoStore = require('connect-mongodb-session')(session);
const generateAccessToken = require('./utils/tokenGenerator');

const privateKey  = fs.readFileSync('api/ssl/apache.key', 'utf8');
const certificate = fs.readFileSync('api/ssl/apache.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate, passphrase: 'local'};

const authConfig = require('./config/auth');

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
routes(router, socket);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    let responseHTML = '<html><head><title>Авторизація</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>'
    responseHTML = responseHTML.replace('%value%', JSON.stringify({
        user: req.user,
        accessToken: generateAccessToken(req.user.googleId)
    }));
    res.status(200).send(responseHTML);
});


app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    'status': 'error'
  });
});

httpServer.listen(port);
console.log('Magic happens on port ' + port);