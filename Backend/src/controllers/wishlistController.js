const Wishlist = require("../models/wishlist");

const addToWishlist = async (req, res) => {
  try {

    const userId = req.user.userId;
    const product = req.body;

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {

      wishlist = await Wishlist.create({
        user: userId,
        products: [product],
      });

      return res.status(201).json(wishlist);
    }

    const alreadyExists = wishlist.products.find(
      (item) => item._id === product._id
    );

    if (alreadyExists) {
      return res.status(400).json({
        message: "Product already in wishlist",
      });
    }

    wishlist.products.push(product);

    await wishlist.save();

    res.status(200).json(wishlist);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};




const getWishlist = async (req, res) => {

  try {

    const wishlist = await Wishlist.findOne({
      user: req.user.userId,
    });

    if (!wishlist) {
      return res.json([]);
    }

    res.json(wishlist.products);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};






const removeWishlistItem = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      user: req.user.userId,
    });

    if (!wishlist) {
      return res.status(404).json({
        message: "Wishlist not found",
      });
    }

    wishlist.products = wishlist.products.filter(
      (item) => item._id.toString() !== req.params.id
    );

    await wishlist.save();

    res.json(wishlist.products);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};






const clearWishlist = async (req, res) => {

  try {

    await Wishlist.findOneAndUpdate(
      { user: req.user.userId },
      { products: [] }
    );

    res.json({
      message: "Wishlist cleared",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};




module.exports = {
  addToWishlist,
  getWishlist,
  removeWishlistItem,
  clearWishlist,
};