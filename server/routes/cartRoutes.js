const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getCart,
  addToCart,
  addCustomPizza,
  updateCart,
  updateCartSize,
  removeItem,
  clearCart,
} = require("../controllers/cartController");

router.get("/", protect, getCart);

router.post("/add", protect, addToCart);

router.post("/add-custom", protect, addCustomPizza);

router.put("/update", protect, updateCart);

router.put("/update-size", protect, updateCartSize);

router.delete("/remove/:id", protect, removeItem);

router.delete("/clear", protect, clearCart);

module.exports = router;