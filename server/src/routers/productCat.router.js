import express from "express";
import productCat_controller from "../controllers/productCat.controller";
const router = express.Router();
router.use(productCat_controller);

module.exports = router;
