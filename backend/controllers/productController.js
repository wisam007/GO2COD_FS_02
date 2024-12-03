const asyncHandler = require("express-async-handler");

const Product = require("../model/productModel");

const getProducts = async (req, res) => {
  const products = await Product.find();

  res.status(200).json(products);
};

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, image, price } = req.body;

  if (!name || !description || !image || !price) {
    res.status(400);
    throw new Error("please fill in all fields");
  }

  const product = await Product.create({
    name,
    description,
    image,
    price,
  });
  res.status(200).json(product);
});

module.exports = { getProducts, createProduct };
