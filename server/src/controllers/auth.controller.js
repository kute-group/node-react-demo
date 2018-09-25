import { Router } from 'express';
import passport from 'passport';
import User from '../models/user.model';

// const jwt = require('jsonwebtoken');
const auth = require('../helpers/auth');

const api = Router();
// var LocalStrategy = require('passport-local').Strategy;
// passport.use(
//   new LocalStrategy(function(username, password, done) {
//     User.findOne({ username: username }, function(err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false);
//       }

//       User.authenticate(password, user.password, result => {
//         if (!result) {
//           return done(null, false, { message: 'Invalid password' });
//         }
//         return done(null, user, { message: 'Logged in Successfully' });
//       });
//     });
//   })
// );
// passport.serializeUser(function(user, done) {
//   done(null, user._id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });

// api.post(
//   '/login',
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   (req, res) => {
// 		const token = jwt.sign({ user : req.user },'top_secret');
//     res.send({
// 			token,
// 			user: req.user
// 		});
//   }
// );

api.get('/logout', (req, res) => {
  req.logout();
  res.send(null);
});

api.post('/login', auth.optional, (req, res, next) => {
  if (req.body.email && req.body.password) {
    return passport.authenticate(
      'local',
      { session: false },
      (err, passportUser, info) => {
        if (err) {
          console.log(err);
          return next(err);
        }

        if (passportUser) {
          const user = passportUser;
          user.token = passportUser.generateJWT();

          return res.json({ user: user.toAuthJSON() });
        }

        return res.status(400).send(info);
      },
    )(req, res, next);

    // User.findOne({ email: req.body.email }).then(user => {
    //   if (!user) {
    //     return res
    //       .status(400)
    //       .send({
    //         message: 'login failed'
    //       })
    //       .end();
    //   } else {
    //     // User.authenticate(req.body.password, user.password, result => {
    //     //   if (!result) {
    //     //     return res
    //     //       .status(400)
    //     //       .send({
    //     //         message: 'wrong password.'
    //     //       })
    //     //       .end();
    //     //   }
    //     //   const token = jwt.sign({ user }, 'top_secret');
    //     //   res
    //     //     .status(200)
    //     //     .send({ user, token })
    //     //     .end();
    //     // });

    //   }
    // });
  }
  res
    .status(400)
    .send('Email and password are required.')
    .end();
});
api.post('/register', (req, res, next) => {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    return res.status(500).send('Password do not match.');
  }
  if (
    req.body.username
    && req.body.email
    && req.body.password
    && req.body.passwordConf
  ) {
    const userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    };
    const user = new User(userData);
    user.save((err, u) => {
      if (err) return next(u);
      return res.status(200).send(u);
    });
  } else {
    res.status(500).send('Can not save data');
  }
  return false;
});

module.exports = api;
