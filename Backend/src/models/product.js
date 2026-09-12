const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  price: {
    type: Number,
    required: true,
    min: 0
  },

  description: {
    type: String,
    required: true,
    trim: true
  },

  category: {
    type: String,
    required: true,
    trim: true
  },

  stock: {
    type: Number,
    default: 0
  },

  image: {
    type: String,
    required: true
  },

  rating: {
    rate: {
      type: Number,
      required: true,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      required: true,
      min: 0
    }
  }
});

module.exports = mongoose.model("Product", productSchema);