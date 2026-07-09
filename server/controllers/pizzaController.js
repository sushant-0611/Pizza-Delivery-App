const Pizza = require("../models/Pizza");
const cloudinary = require("../config/cloudinary");
const fs = require("fs-extra");
// Add Pizza
exports.addPizza = async (req, res) => {
    console.log(req.file);
  console.log(req.body);
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Pizza image is required",
      });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "PizzaDeliveryApp/Pizzas",
    });

    // Delete local uploaded file
    await fs.remove(req.file.path);

    // Create pizza
    const {
  name,
  description,
  category,
  isVeg,
  available,
  smallPrice,
  mediumPrice,
  largePrice,
} = req.body;

const pizza = await Pizza.create({
  name,
  description,
  category,
  isVeg,
  available,
  image: {
    url: result.secure_url,
    public_id: result.public_id,
  },
  sizes: [
    {
      size: "Small",
      price: Number(smallPrice),
    },
    {
      size: "Medium",
      price: Number(mediumPrice),
    },
    {
      size: "Large",
      price: Number(largePrice),
    },
  ],
});

    res.status(201).json({
      success: true,
      message: "Pizza Added Successfully",
      pizza,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Pizzas
exports.getPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find();

    res.json({
      success: true,
      count: pizzas.length,
      pizzas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// Get Single Pizza
exports.getPizzaById = async (req, res) => {
    try {

        const pizza = await Pizza.findById(req.params.id);

        if (!pizza) {
            return res.status(404).json({
                success: false,
                message: "Pizza not found"
            });
        }

        res.status(200).json({
            success: true,
            pizza
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

// Update Pizza
exports.updatePizza = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);

    if (!pizza) {
      return res.status(404).json({
        success: false,
        message: "Pizza not found",
      });
    }

    let image = pizza.image;

    // New image uploaded
    if (req.file) {
      // Delete old image
      await cloudinary.uploader.destroy(pizza.image.public_id);

      // Upload new image
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "PizzaDeliveryApp/Pizzas",
      });

      await fs.remove(req.file.path);

      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const {
      name,
      description,
      category,
      isVeg,
      available,
      smallPrice,
      mediumPrice,
      largePrice,
    } = req.body;

    pizza.name = name;
    pizza.description = description;
    pizza.category = category;
    pizza.isVeg = isVeg;
    pizza.available = available;

    pizza.image = image;

    pizza.sizes = [
      {
        size: "Small",
        price: Number(smallPrice),
      },
      {
        size: "Medium",
        price: Number(mediumPrice),
      },
      {
        size: "Large",
        price: Number(largePrice),
      },
    ];

    await pizza.save();

    res.status(200).json({
      success: true,
      message: "Pizza Updated Successfully",
      pizza,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};
// Delete Pizza
exports.deletePizza = async (req, res) => {

    try {

        await Pizza.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Pizza Deleted"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};