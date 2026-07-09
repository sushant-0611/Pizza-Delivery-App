const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

// जर admin middleware असेल तर uncomment कर
// const { adminOnly } = require("../middleware/authMiddleware");


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
// USER ORDER ROUTES
// ==================================


// ================================
// COD PLACE ORDER
// ================================

router.post(
  "/place",
  protect,
  placeOrder
);





// ================================
// CREATE RAZORPAY PAYMENT ORDER
// ================================

router.post(
  "/create-payment",
  protect,
  createPaymentOrder
);





// ================================
// VERIFY RAZORPAY PAYMENT
// ================================

router.post(
  "/verify-payment",
  protect,
  verifyPayment
);





// ================================
// GET USER ORDERS
// ================================

router.get(
  "/my-orders",
  protect,
  getMyOrders
);







// ==================================
// ADMIN ORDER ROUTES
// ==================================



// ================================
// GET ALL ORDERS
// ================================

router.get(
  "/",
  protect,
  // adminOnly,
  getAllOrders
);






// ================================
// GET SINGLE ORDER
// ================================

router.get(
  "/:id",
  protect,
  // adminOnly,
  getOrderById
);






// ================================
// UPDATE ORDER STATUS
// ================================

router.put(
  "/:id",
  protect,
  // adminOnly,
  updateOrderStatus
);






// ================================
// DELETE ORDER
// ================================

router.delete(
  "/:id",
  protect,
  // adminOnly,
  deleteOrder
);





module.exports = router;