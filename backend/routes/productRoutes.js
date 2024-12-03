const express = require("express");

const { protect, isAdmin } = require("../middleware/authMiddleware");

const {
  getProducts,
  createProduct,
} = require("../controllers/productController");

const router = express.Router();

router.post("/add", protect, isAdmin, createProduct);

router.get("/", getProducts);

module.exports = router;
