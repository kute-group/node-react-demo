import express from 'express';
const router = express.Router();

import user_controller from '../controllers/user.controller';
router.use(user_controller);

module.exports = router;
