import { Router } from 'express';
import User from '../models/user.model';
const auth = require('../helpers/auth');

const api = Router();
api.get('/me', auth.required, (req, res) => {
  User.findById(req.user._id)
    .then(user => {
      return res.json(user);
    })
    .catch(err => {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    });
});
api.get('/', auth.optional, (req, res) => {
  res.send({ hello: 'true' });
});
api.post('/create', (req, res, next) => {
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
