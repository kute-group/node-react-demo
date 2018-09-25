import { Router } from 'express';
import Product from '../models/product.model';
import helpers from '../helpers';
import { PAGE_LIMIT } from '../../config.json';

const api = Router();

// get product and add to req
api.param('id', async (req, res, next, id) => {
  try {
    const product = await Product.load({ _id: id });
    req.product = product;
    next();
  } catch (err) {
    console.log(err);
  }
});
// get products list
api.get('/', async (req, res) => {
  const { page, limit } = req.query;
  const options = {
    limit: limit || PAGE_LIMIT,
    page: page || 0,
    criteria: {},
  };
  let products = await Product.list(options);
  products = products.map(prod => Product.format(prod));
  const count = await Product.count();
  res.status(200).send(
    helpers.db.format({
      limit: options.limit,
      page: options.page,
      count,
      list: products,
    }),
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
      message: `Can not get product id = ${id}`,
    });
  }
});

// create new product
api.post('/', (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    createdBy: req.body.createdBy,
    price: req.body.price,
  });
  product.save(err => {
    if (err) return next(err);
  });
  res.status(201).send({
    status: 'success',
    message: 'Create new product successfully.',
  });
});

// update a product
api.put('/:id', async (req, res) => {
  const { id } = req.params;
  const body = {
    name: req.body.name,
    updatedBy: req.body.updatedBy,
    price: req.body.price,
  };
  try {
    await Product.updateById(id, body);
    res.status(201).send({
      status: 'success',
      message: 'Update product successfully.',
    });
  } catch (err) {
    res.status(501).send({
      status: 'failed',
      message: `Can not update product id = ${id}`,
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
      message: `Delete product id = ${id} successfully.`,
    });
  } catch (err) {
    res.status(501).send({
      status: 'failed',
      message: `Can not delete product id = ${id}`,
    });
  }
});
/*
reviews
*/

// add new a review
// todo: get user from req
api.post('/:id/review', async (req, res) => {
  const user = {
    createdAt: '2018-09-25T02:55:39.395Z',
    updatedAt: '2018-09-25T02:55:39.396Z',
    _id: '5ba89afc90541916f7415d5f',
    email: 'luonghop.itq3@gmail.com',
    username: 'hoplb3',
    password: '$2b$10$8RlkULTdJ9yRh6t9T.cmk.Nw4CSUJRata9JWU7o64x.4aeYpWC3vq',
    fullname: 'Luong Ba Hop',
    birthday: null,
    __v: 0,
  };
  const {
    body: { content },
    product,
  } = req;
  try {
    product.createReview(user, content);
    res.status(201).send({
      status: 'success',
      message: 'Add new a review successfully.',
    });
  } catch (err) {
    res.status(501).send({
      status: 'failed',
      message: 'Can not add a new review.',
    });
  }
});

// delete a review
api.delete('/:id/review/:reviewId', async (req, res) => {
  const {
    params: { reviewId },
    product,
  } = req;
  try {
    product.removeReview(reviewId);
    res.status(201).send({
      status: 'success',
      message: 'Remove a review successfully.',
    });
  } catch (err) {
    console.log(err);
    res.status(501).send({
      status: 'failed',
      message: `Can not remove the review id = ${reviewId}`,
    });
  }
});

module.exports = api;
