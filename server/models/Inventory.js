const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    // Ingredient Name
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    // Ingredient Type
    type: {
      type: String,
      enum: ["Base", "Sauce", "Cheese", "Vegetable"],
      required: true,
    },

    // Ingredient Price
    price: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    // Available Stock
    stock: {
      type: Number,
      required: true,
      default: 100,
      min: 0,
    },

    // Low Stock Alert Threshold
    threshold: {
      type: Number,
      default: 20,
      min: 0,
    },

    // Unit
    unit: {
      type: String,
      default: "Units",
    },

    // Availability
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Inventory", inventorySchema);