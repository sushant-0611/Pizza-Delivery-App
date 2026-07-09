const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema(
  {
    inventoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
    },

    name: String,

    price: Number,
  },
  { _id: false }
);

const cartItemSchema = new mongoose.Schema({
  // Existing Pizza
  pizza: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pizza",
    default: null,
  },

  // Normal or Custom
  custom: {
    type: Boolean,
    default: false,
  },

  name: {
    type: String,
    default: "",
  },

  image: {
    type: String,
    default: "",
  },

  size: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    default: 1,
  },

  price: {
    type: Number,
    required: true,
  },

  base: ingredientSchema,

  sauce: ingredientSchema,

  cheese: [ingredientSchema],

  vegetables: [ingredientSchema],
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    items: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);