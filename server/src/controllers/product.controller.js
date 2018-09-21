import { Router } from 'express';
import Product from '../models/product.model';

const api = Router();
api.get('/', (req, res)=>{
	Product.find({}, (err, products) => {
		if (err) {
			res.send(err);
		}
		res.json(products);
		console.log('requested');
	});
	console.log('requested');
})
api.post('/create', (req, res, next) => {
	const product = new Product({
		name: req.body.name,
		price: req.body.price,
	})
	console.log('product', product);
	product.save((err)=>{
		if(err) return next(err);
	})
  res.send('saved');
});

module.exports = api;