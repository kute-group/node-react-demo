import express from "express";
import auth_controller from "../controllers/auth.controller";
const router = express.Router();
router.use(auth_controller);

module.exports = router;
