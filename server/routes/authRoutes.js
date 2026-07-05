const express = require("express");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

const {
    register,
    login,
    getProfile
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

// Protected Route
router.get("/me", protect, getProfile);

module.exports = router;