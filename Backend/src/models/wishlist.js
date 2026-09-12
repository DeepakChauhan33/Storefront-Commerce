const mongoose = require("mongoose");


const wishlistSchema = new mongoose.Schema(

  {

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        _id: String,
        title: String,
        price: Number,
        image: String,
        category: String,
        description: String,
      },
    ],
  },
  {
    timestamps: true,
  }

);

module.exports = mongoose.model("Wishlist", wishlistSchema);