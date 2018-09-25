import express from "express";

import user_controller from "../controllers/user.controller";

const router = express.Router();
router.use(user_controller);

module.exports = router;
