const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/authMiddleware");

const {
  getInventory,
  getInventoryByType,
  addInventory,
  bulkAddInventory,
  updateInventory,
  deleteInventory,
} = require("../controllers/inventoryController");
// ============================
// User Routes
// ============================

// Get Complete Inventory
router.get("/", protect, getInventory);

// Get Inventory By Type
router.get("/type/:type", protect, getInventoryByType);

// ============================
// Admin Routes
// ============================

// Add Inventory Item
router.post("/", protect, adminOnly, addInventory);

router.post("/bulk", protect, adminOnly, bulkAddInventory);

// Update Inventory
router.put("/:id", protect, adminOnly, updateInventory);

// Delete Inventory
router.delete("/:id", protect, adminOnly, deleteInventory);

module.exports = router;