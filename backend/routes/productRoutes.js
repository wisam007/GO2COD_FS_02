const express = require("express");

const { protect, isAdmin } = require("../middleware/authMiddleware");

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getProducts);
router.post("/add", protect, isAdmin, createProduct);
router.put("/:id", protect, isAdmin, updateProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);

router.get("/", getProducts);

module.exports = router;
