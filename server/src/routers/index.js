import express from "express";
// import quotes from './quotes';

const router = express.Router();

router.use("/auth", require("./auth.router"));
router.use("/user", require("./user.router"));

router.use("/chat", require("./chat.router"));
// router.use("/cart", require("./cart.router"));
router.use("/product", require("./product.router"));
router.use("/productCat", require("./productCat.router"));

module.exports = router;
