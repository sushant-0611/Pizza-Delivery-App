const Pizza = require("../models/Pizza");
const User = require("../models/User");
const Order = require("../models/Order");

exports.getDashboard = async (req, res) => {
  try {

    const totalPizzas = await Pizza.countDocuments();

    const totalUsers = await User.countDocuments();

    const totalOrders = await Order.countDocuments();

    const revenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

    const latestPizzas = await Pizza.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const recentOrders = await Order.find()
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,

      totalPizzas,

      totalUsers,

      totalOrders,

      totalRevenue:
        revenue.length > 0
          ? revenue[0].totalRevenue
          : 0,

      latestPizzas,

      recentOrders,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};