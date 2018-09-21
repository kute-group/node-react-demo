import { Router } from 'express';
import User from '../models/user.model';

const api = Router();
api.get('/', (req, res)=>{
	User.find({}, (err, users) => {
		if (err) {
			res.send(err);
		}
		res.json(users);
		console.log('requested');
	});
	console.log('requested');
})
api.post('/create', (req, res, next) => {
	const user = new User({
		name: req.body.name,
		age: req.body.age,
	})
	console.log('user', user);
	user.save((err)=>{
		if(err) return next(err);
	})
  res.send('saved');
});

module.exports = api;