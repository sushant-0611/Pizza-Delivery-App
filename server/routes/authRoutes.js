const express = require("express");
const router = express.Router();

const {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

// ==========================
// Public Routes
// ==========================

// Register User
router.post("/register", register);

// Login User
router.post("/login", login);

// Verify Email
router.get("/verify-email/:token", verifyEmail);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Reset Password
router.post("/reset-password/:token", resetPassword);

// ==========================
// Protected Routes
// ==========================

// Get User Profile
router.get("/profile", protect, getProfile);

// Update User Profile
router.put("/profile", protect, updateProfile);

module.exports = router;