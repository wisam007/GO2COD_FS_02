const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  addToCart,
  removeFromCart,
  getCart,
  clearCart,
} = require("../controllers/cartController");

router.post("/add/:productId", protect, addToCart);

// Remove product from cart
router.post("/remove/:productId", protect, removeFromCart);

// Get cart details
router.get("/", protect, getCart);

// Clear cart
router.post("/clear", protect, clearCart);

module.exports = router;
