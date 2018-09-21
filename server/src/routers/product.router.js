import express from 'express';
const router = express.Router();

import product_controller from '../controllers/product.controller';

router.use(product_controller);

module.exports = router;
