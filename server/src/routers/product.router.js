import express from 'express';

import product_controller from '../controllers/product.controller';

const router = express.Router();

router.use(product_controller);

module.exports = router;
