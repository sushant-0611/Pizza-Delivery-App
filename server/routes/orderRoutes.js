const express = require("express");

const router = express.Router();


const protect = require("../middleware/authMiddleware");

const {
  adminOnly
} = require("../middleware/authMiddleware");



const {

  placeOrder,

  createPaymentOrder,

  verifyPayment,

  getMyOrders,

  getAllOrders,

  getOrderById,

  updateOrderStatus,

  deleteOrder,

} = require("../controllers/orderController");





// ==================================
// USER ROUTES
// ==================================


// COD ORDER

router.post(
  "/place",
  protect,
  placeOrder
);





// CREATE RAZORPAY ORDER

router.post(
  "/create-payment",
  protect,
  createPaymentOrder
);





// VERIFY PAYMENT

router.post(
  "/verify-payment",
  protect,
  verifyPayment
);





// USER ORDERS

router.get(
  "/my-orders",
  protect,
  getMyOrders
);









// ==================================
// ADMIN ROUTES
// ==================================


// GET ALL ORDERS

router.get(
  "/",
  protect,
  adminOnly,
  getAllOrders
);







// UPDATE ORDER STATUS

router.put(
  "/:id",
  protect,
  adminOnly,
  updateOrderStatus
);







// DELETE ORDER

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteOrder
);







// GET SINGLE ORDER
// Always keep this LAST

router.get(
  "/:id",
  protect,
  adminOnly,
  getOrderById
);







module.exports = router;