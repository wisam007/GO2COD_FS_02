const Cart = require("../model/cartModel");
const Product = require("../model/productModel");

const addToCart = async (req, res) => {
  const userId = req.user._id; // Assuming the middleware sets req.user
  const { productId } = req.params; // Get product ID from route params
  const { quantity } = req.body; // Quantity remains in the body

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const parsedQuantity = Number(quantity); // Ensure quantity is a number
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be a positive number" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [], total: 0 });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );
    if (productIndex > -1) {
      cart.products[productIndex].quantity += parsedQuantity; // Add quantity as a number
    } else {
      cart.products.push({ productId, quantity: parsedQuantity });
    }

    cart.total += product.price * parsedQuantity; // Update total with parsed quantity
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  const userId = req.user._id; // From middleware
  const { productId } = req.params; // From route params

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );
    if (productIndex > -1) {
      const product = await Product.findById(productId);
      cart.total -= product.price * cart.products[productIndex].quantity;
      cart.products.splice(productIndex, 1);
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCart = async (req, res) => {
  const userId = req.user._id; // From middleware

  try {
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const clearCart = async (req, res) => {
  const userId = req.user._id; // From middleware

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = [];
    cart.total = 0;
    await cart.save();

    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  getCart,
  clearCart,
};
