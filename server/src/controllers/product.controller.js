import { Router } from 'express';
import Product from '../models/product.model';
import helpers from '../helpers';
import { PAGE_LIMIT } from '../../config.json';
const api = Router();
// get products list
api.get('/', async (req, res) => {
  const { page, limit } = req.query;
  const options = {
    limit: limit || PAGE_LIMIT,
    page: page || 0,
    criteria: {}
  };
  let products = await Product.list(options);
  products = products.map(prod => Product.format(prod));
  const count = await Product.count();
  res.status(200).send(
    helpers.db.format({
      limit: options.limit,
      page: options.page,
      count,
      list: products
    })
  );
});

// get one product by id
api.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let product = await Product.load({ _id: id });
    product = Product.format(product);
    res.status(200).send(product);
  } catch (err) {
    res.status(501).send({
      status: 'failed',
      message: `Can not get product id = ${id}`
    });
  }
});

// create new product
api.post('/', (req, res, next) => {
  const product = new Product({
		name: req.body.name,
		createdBy: req.body.createdBy,
    price: req.body.price
  });
  product.save(err => {
    if (err) return next(err);
  });
  res.status(201).send({
    status: 'success',
    message: 'Create new product successfully.'
  });
});

// update a product
api.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const body = {
		name: req.body.name,
		updatedBy: req.body.updatedBy,
    price: req.body.price
  };
  try {
    await Product.updateById(id, body);
    res.status(201).send({
      status: 'success',
      message: 'Update product successfully.'
    });
  } catch (err) {
    res.status(501).send({
      status: 'failed',
      message: `Can not update product id = ${id}`
    });
  }
});

// delete a product
api.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Product.deleteById(id);
    res.status(201).send({
      status: 'success',
      message: `Delete product id = ${id} successfully.`
    });
  } catch (err) {
    res.status(501).send({
      status: 'failed',
      message: `Can not delete product id = ${id}`
    });
  }
});

module.exports = api;
