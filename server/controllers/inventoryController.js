const Inventory = require("../models/Inventory");

// =====================================
// Get All Inventory
// =====================================
exports.getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find().sort({
      type: 1,
      name: 1,
    });

    res.status(200).json({
      success: true,
      inventory,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch inventory",
    });
  }
};

// =====================================
// Get Inventory By Type
// =====================================
exports.getInventoryByType = async (req, res) => {
  try {
    const { type } = req.params;

    const inventory = await Inventory.find({
      type,
    }).sort({
      name: 1,
    });

    res.status(200).json({
      success: true,
      inventory,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch inventory",
    });
  }
};

// =====================================
// Add Inventory Item
// =====================================
exports.addInventory = async (req, res) => {
  try {
    const {
        name,
        type,
        price,
        stock,
        threshold,
        unit,
      } = req.body;

    if (!name || !type) {
      return res.status(400).json({
        success: false,
        message: "Name and Type are required",
      });
    }

    const exists = await Inventory.findOne({
      name,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Inventory item already exists",
      });
    }

    const item = await Inventory.create({
          name,
          type,
          price: price || 0,
          stock: stock || 100,
          threshold: threshold || 20,
          unit: unit || "Units",
          available: (stock || 100) > 0,
        });

    res.status(201).json({
      success: true,
      message: "Inventory Item Added",
      item,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to add inventory",
    });
  }
};
// =====================================
// Add Many Inventory Item
// =====================================
exports.bulkAddInventory = async (req, res) => {
  try {
    console.log(req.body);

    const items = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: "Request body must be an array",
      });
    }

    const inventory = await Inventory.insertMany(items);

    res.status(201).json({
      success: true,
      message: `${inventory.length} items added successfully`,
      inventory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Update Inventory
// =====================================
exports.updateInventory = async (req, res) => {
  try {
    const { id } = req.params;

    const {
            price,
            stock,
            threshold,
            available,
          } = req.body;

        if (!item) {
          return res.status(404).json({
            success: false,
            message: "Inventory item not found",
          });
        }
          if (price !== undefined)
        item.price = price;

      if (stock !== undefined)
        item.stock = stock;

      if (threshold !== undefined)
        item.threshold = threshold;

      if (available !== undefined)
        item.available = item.stock > 0;
          await item.save();

    res.status(200).json({
      success: true,
      message: "Inventory Updated Successfully",
      item,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to update inventory",
    });
  }
};

// =====================================
// Delete Inventory Item
// =====================================
exports.deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Inventory.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Inventory item not found",
      });
    }

    await item.deleteOne();

    res.status(200).json({
      success: true,
      message: "Inventory Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to delete inventory",
    });
  }
};

// =====================================
// Reduce Stock After Order
// =====================================
exports.reduceStock = async (builder) => {
  try {
    await Inventory.findOneAndUpdate(
      { name: builder.base },
      { $inc: { stock: -1 } }
    );

    await Inventory.findOneAndUpdate(
      { name: builder.sauce },
      { $inc: { stock: -1 } }
    );

    await Inventory.findOneAndUpdate(
      { name: builder.cheese },
      { $inc: { stock: -1 } }
    );

    for (const veg of builder.vegetables) {
      await Inventory.findOneAndUpdate(
        { name: veg },
        { $inc: { stock: -1 } }
      );
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};