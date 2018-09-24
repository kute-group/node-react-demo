// import external
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';

// import internal
const { PORT, DB } = require('../config.json');
import routers from './routers';
import helpers from './helpers';


const app = express();

// connect to database
mongoose.connect(DB);
mongoose.connection.on('error', () =>
  helpers.common.log('Connect failed...', 'red')
);
mongoose.connection.on('connected', () =>
  helpers.common.log('Connected database...', 'green')
);

// middlewares
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


// express session
app.use(
  session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
  })
);
// passport init
app.use(passport.initialize());
app.use(passport.session());
// routers
require('./middlewares/passport');
app.get("/", function(req, res) {
  res.json({message: "Express is up!"});
});
app.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
  res.json("Success! You can not see this without a token");
});
app.use('/api/v1', routers);

// handle errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error : err });
});

app.listen(PORT, () => {
  helpers.common.log(`Server is running at port: ${PORT}`, 'blue');
});
