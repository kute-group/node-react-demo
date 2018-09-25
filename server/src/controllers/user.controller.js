import { Router } from 'express';
import User from '../models/user.model';
import helpers from '../helpers';
import { PAGE_LIMIT } from '../../config.json';

const auth = require('../helpers/auth');

const api = Router();
api.get('/me', auth.required, async (req, res) => {
  try {
    let user = await User.load({ _id: req.payload.id });
    user = User.format(user);
    res.status(200).send(user);
  } catch (err) {
    res.status(501).send({
      status: 'failed',
      message: `Can not get user id = ${req.payload.id}`,
    });
  }
});

// get users list
api.get('/', auth.required, async (req, res) => {
  const { page, limit } = req.query;
  const options = {
    limit: limit || PAGE_LIMIT,
    page: page || 0,
    criteria: {},
  };
  let users = await User.list(options);
  users = users.map(user => User.format(user));
  const count = await User.count();
  res.status(200).send(
    helpers.db.format({
      limit: options.limit,
      page: options.page,
      count,
      list: users,
    }),
  );
});
api.post('/', auth.required, (req, res, next) => {
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
      fullname: req.body.fullname || '',
      birthday: req.body.birthday || '',
    };
    const user = new User(userData);
    user.save((err, user) => {
      if (err) return next(err);
      res.status(200).send({
        user,
        status: 'success',
        message: 'Add new user successfully.',
      });
    });
  } else {
    res.status(500).send('Can not save data');
  }
});

module.exports = api;
