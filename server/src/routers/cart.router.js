import express from "express";
import cart_controller from "../controllers/cart.controller";
const router = express.Router();
router.use(cart_controller);

module.exports = router;
