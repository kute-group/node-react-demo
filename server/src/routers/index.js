import express from "express";
// import quotes from './quotes';

const router = express.Router();

router.use("/auth", require("./auth.router"));
router.use("/user", require("./user.router"));
router.use("/product", require("./product.router"));

module.exports = router;
