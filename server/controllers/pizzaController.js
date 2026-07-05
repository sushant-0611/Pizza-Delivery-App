const Pizza = require("../models/Pizza");

// Add Pizza
exports.addPizza = async (req, res) => {
  try {
    const pizza = await Pizza.create(req.body);

    res.status(201).json({
      success: true,
      message: "Pizza Added Successfully",
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

        const pizza = await Pizza.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Pizza Updated",
            pizza
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server Error"
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