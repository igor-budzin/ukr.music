const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); 
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongodb-session')(session);

const privateKey  = fs.readFileSync('api/ssl/apache.key', 'utf8');
const certificate = fs.readFileSync('api/ssl/apache.crt', 'utf8');

const __logger = require('../utils/logger');
const routes = require('../routes');

class Server {
  constructor({ port, routers, middlewares }) {
    __logger.info('Server start initialization...')
    return start({ port, routers, middlewares });
  }
}

function start({port, routers, middlewares}) {
  if (!Array.isArray(routers)) {
    throw new Error('\'routers\' should be an array.')
  }

  if (!Array.isArray(middlewares)) {
    throw new Error('\'middlewares\' should be an array.')
  }

  return new Promise((resolve, reject) => {
    const app = express();
    const server = http.createServer(app);

    const router = express.Router();

    const socket = require('socket.io')(server);

    app.use(passport.initialize());
    require('../auth/passport')(passport);

    if(process.env.NODE_ENV !== 'production') app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());

    app.use('/api', router);

    router.get('/', function (req, res) {
      res.json({
          status: true,
          message: 'Ok',
      });
    });

    routes(router, socket);

    app.use((err, req, res, next) => {
      console.log(err);
      res.status(500).json({
        'status': 'error'
      });
    });

    return server.listen(port, () => resolve({ port }));
  });
}

module.exports = Server;