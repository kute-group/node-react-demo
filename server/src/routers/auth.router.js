import express from 'express';
const router = express.Router();

import auth_controller from '../controllers/auth.controller';
router.use(auth_controller);

module.exports = router;
