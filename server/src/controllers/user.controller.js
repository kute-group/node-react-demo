import { Router } from 'express';
import User from '../models/user.model';

const api = Router();
api.get('/me', (req, res) => {
  if (!req.auth) {
    return res.status(401).send({
      message: ' not login'
    });
  }
  User.findById(req.auth.id)
    .then(user => {
      return res.json(user);
    })
    .catch(err => {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    });
});
api.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.send(err);
    }
    res.json(users);
    console.log('requested');
  });
  console.log('requested');
});
api.post('/create', (req, res, next) => {
	// confirm that user typed same password twice
	if(req.body.password !== req.body.passwordConf){
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
