const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");


router.get("/", authMiddleware, getCart);

router.post("/add", authMiddleware, addToCart);

router.put("/update", authMiddleware, updateQuantity);

router.delete("/remove/:productId", authMiddleware, removeFromCart);

router.delete("/clear", authMiddleware, clearCart);


// router.get("/test", (req, res) => {
//   res.json({ message: "Update route works" });
// });
module.exports = router;