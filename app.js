const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");
const adminProfileRoutes = require("./routes/adminProfileRoutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Route imports
const authRoutes = require("./routes/auth");
const vehicleRoutes = require("./routes/vehicles");
const buyerRoutes = require("./routes/buyers");
const profileRoutes = require("./routes/profileRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve static images

// Request logging in dev
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Health check routes
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});

app.get("/", (req, res) => {
  res.send("Jivhala Motors API is running...");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/buyers", buyerRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin/profile", adminProfileRoutes);


// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

module.exports = app;
