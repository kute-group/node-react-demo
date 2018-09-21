import { Router } from 'express';
import User from '../models/user.model';
const api = Router();

api.post('/login', (req, res, next) => {
  if (req.body.email && req.body.password) {
    User.findOne({ email: req.body.email }).then(user => {
      if (!user) {
        return res.status(400).send({
          message: 'login failed'
        });
      } else {
        User.authenticate(req.body.password, user.password, result => {
          if (!result) {
            return res.status(400).send({
              message: 'wrong password.'
            });
          }
          res.status(200).send(user);
        });
      }
    });
  } else {
    res.status(400).send('Email and password are required.');
  }
});
api.post('/register', (req, res, next) => {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    return res.status(500).send('Password do not match.');
  }
  if (
    req.body.username &&
    req.body.email &&
    req.body.password &&
    req.body.passwordConf
  ) {
    const userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf
    };
    const user = new User(userData);
    user.save((err, user) => {
      if (err) return next(err);
      res.status(200).send(user);
    });
  } else {
    res.status(500).send('Can not save data');
  }
});

module.exports = api;
