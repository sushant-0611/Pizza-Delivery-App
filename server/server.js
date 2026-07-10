const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const http = require("http");

// ==============================
// Load Environment Variables
// ==============================

dotenv.config();

const connectDB = require("./config/db");

// ==============================
// Connect Database
// ==============================

connectDB();

const app = express();
const server = http.createServer(app);

// ==============================
// Socket.io
// ==============================

const { initSocket } = require("./socket");

initSocket(server);

// ==============================
// Background Jobs
// ==============================

require("./jobs/inventoryAlert");

// ==============================
// Middleware
// ==============================

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

// ==============================
// Routes Import
// ==============================

const authRoutes = require("./routes/authRoutes");
const pizzaRoutes = require("./routes/pizzaRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");

// ==============================
// API Routes
// ==============================

app.use("/api/auth", authRoutes);

app.use("/api/pizzas", pizzaRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/inventory", inventoryRoutes);

// ==============================
// Root Route
// ==============================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🍕 Pizza Delivery API Running Successfully",
  });
});

// ==============================
// 404 Handler
// ==============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
  });
});

// ==============================
// Global Error Handler
// ==============================

app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ==============================
// Start Server
// ==============================

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("====================================");
  console.log(`🚀 Server Running : http://localhost:${PORT}`);
  console.log(
    `🌍 Environment : ${
      process.env.NODE_ENV || "development"
    }`
  );
  console.log("📧 Inventory Email Alert Service Started");
  console.log("⚡ Socket.io Server Started");
  console.log("====================================");
});