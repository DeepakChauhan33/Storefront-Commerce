

const Orders = require("../models/orders");
const Product = require("../models/product");



const placeOrder = (req, res) => res.render('orderForm');





const createOrder = async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        message: "Order must contain at least one product",
      });
    }

    let totalAmount = 0;

    const orderProducts = [];

    for (const item of products) {
      if (!item.productId || !item.quantity || item.quantity < 1) {
        return res.status(400).json({
          message: "Invalid product or quantity",
        });
      }

      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.title}`,
        });
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      orderProducts.push({
        productId: product._id,
        title: product.title,
        price: product.price,
        quantity: item.quantity,
      });
    }

    // Add delivery charge
    totalAmount += 50;

    const order = await Orders.create({
      user: req.user.userId,
      products: orderProducts,
      totalAmount,
    });

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);

    res.status(500).json({
      message: "Failed to create order",
    });
  }
};





const getOrders = async (req, res) => {

  try {

    const orders = await Orders.find({
      user: req.user.userId
    });

    res.status(200).json(orders);

  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }

}





module.exports = {

  createOrder,
  placeOrder,
  getOrders

}