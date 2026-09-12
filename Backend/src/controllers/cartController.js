const Cart = require("../models/cart");
const Product = require("../models/product");



// =========================
// Get Cart
// =========================

const getCart = async (req, res) => {

  try {

    const cart = await Cart.findOne({
      user: req.user.userId,
    }).populate("items.product");

    if (!cart) {
      return res.status(200).json([]);
    }

    res.status(200).json(cart.items);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



// =========================
// Add Product
// =========================

const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.stock < 1) {
      return res.status(400).json({
        message: "Product is out of stock",
      });
    }

    let cart = await Cart.findOne({
      user: req.user.userId,
    });

    if (!cart) {
      cart = new Cart({
        user: req.user.userId,
        items: [],
      });
    }

    const existingProduct = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingProduct) {
      if (existingProduct.quantity >= product.stock) {
        return res.status(400).json({
          message: "Not enough stock available",
        });
      }

      existingProduct.quantity += 1;
    } else {
      cart.items.push({
        product: product._id,
        quantity: 1,
        price: product.price,
      });
    }

    await cart.save();

    const updatedCart = await Cart.findOne({
      user: req.user.userId,
    }).populate("items.product");

    res.status(200).json(updatedCart.items);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// =========================
// Update Quantity
// =========================

const updateQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validate product ID and quantity
    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
      });
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

    const cart = await Cart.findOne({
      user: req.user.userId,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    item.quantity = quantity;

    await cart.save();

    const updatedCart = await Cart.findOne({
      user: req.user.userId,
    }).populate("items.product");

    res.status(200).json(updatedCart.items);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// =========================
// Remove Product
// =========================

const removeFromCart = async (req, res) => {

  try {

    const { productId } = req.params;

    const cart = await Cart.findOne({
      user: req.user.userId,
    });

    if (!cart) {

      return res.status(404).json({
        message: "Cart not found",
      });

    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    const updatedCart = await Cart.findOne({
      user: req.user.userId,
    }).populate("items.product");

    res.status(200).json(updatedCart.items);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// =========================
// Clear Cart
// =========================

const clearCart = async (req, res) => {

  try {

    await Cart.findOneAndUpdate(
      { user: req.user.userId },
      { items: [] }
    );

    res.status(200).json({
      message: "Cart cleared",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
};