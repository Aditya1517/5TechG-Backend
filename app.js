const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Route imports
const authRoutes = require("./routes/auth");
const vehicleRoutes = require("./routes/vehicles");
const buyerRoutes = require("./routes/buyers");
const profileRoutes = require("./routes/profileRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Static file serving

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});

app.get("/", (req, res) => {
  res.send("Jivhala Motors API is running...");
});

// API Routes
app.use("/api/auth", authRoutes);             // Auth routes (login/register)
app.use("/api/vehicles", vehicleRoutes);      // Vehicle CRUD routes
app.use("/api/buyers", buyerRoutes);          // Buyer-related routes
app.use("/api/profile", profileRoutes);       // Profile management
app.use("/api/dashboard", dashboardRoutes);   // Dashboard stats

module.exports = app;
