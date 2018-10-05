import { Router } from "express";
import ProductCat from "../models/productCat.model";
import helpers from "../helpers";
import { PAGE_LIMIT } from "../../config.json";
const auth = require("../helpers/auth");
const api = Router();

// get productCat and add to req
api.param("id", async (req, res, next, id) => {
  try {
    const productCat = await ProductCat.load({ _id: id });
    req.productCat = productCat;
    next();
  } catch (err) {
    console.log(err);
  }
});
// get productCats list
api.get("/", auth.optional, async (req, res) => {
  const { page, limit } = req.query;
  const options = {
    limit: limit || PAGE_LIMIT,
    page: page || 0,
    criteria: {}
  };
  let productCats = await ProductCat.list(options);
  productCats = productCats.map(prod => ProductCat.format(prod));
  const count = await ProductCat.count();
  res.status(200).send(
    helpers.db.format({
      limit: options.limit,
      page: options.page,
      count,
      list: productCats
    })
  );
});

// get one productCat by id
api.get("/:id", auth.optional, async (req, res) => {
  const { id } = req.params;
  try {
    let productCat = await ProductCat.load({ _id: id });
    productCat = ProductCat.format(productCat);
    res.status(200).send(productCat);
  } catch (err) {
    res.status(501).send({
      status: "failed",
      message: `Can not get productCat id = ${id}`
    });
  }
});

// create new productCat
api.post("/", auth.optional, (req, res, next) => {
  const productCat = new ProductCat({
    name: req.body.name,
    createdBy: req.body.createdBy,
    price: req.body.price
  });
  productCat.save(err => {
    if (err) return next(err);
  });
  res.status(201).send({
    status: "success",
    message: "Create new productCat successfully."
  });
});

// update a productCat
api.put("/:id", auth.required, async (req, res) => {
  const { id } = req.params;
  const body = {
    name: req.body.name,
    updatedBy: req.body.updatedBy,
    price: req.body.price
  };
  try {
    await ProductCat.updateById(id, body);
    res.status(201).send({
      status: "success",
      message: "Update productCat successfully."
    });
  } catch (err) {
    res.status(501).send({
      status: "failed",
      message: `Can not update productCat id = ${id}`
    });
  }
});

// delete a productCat
api.delete("/:id", auth.required, async (req, res) => {
  const { id } = req.params;
  try {
    await ProductCat.deleteById(id);
    res.status(201).send({
      status: "success",
      message: `Delete productCat id = ${id} successfully.`
    });
  } catch (err) {
    res.status(501).send({
      status: "failed",
      message: `Can not delete productCat id = ${id}`
    });
  }
});

module.exports = api;
