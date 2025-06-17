const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const authenticateToken = require("../middleware/authenticateToken");

// Login validation rules
const loginValidation = [
  body("username", "Username is required").notEmpty(),
  body("password", "Password is required").notEmpty(),
];

// POST /api/auth/login
router.post("/login", loginValidation, validate, login);

// GET /api/auth/profile (protected)
router.get("/profile", authenticateToken, (req, res) => {
  res.status(200).json({
    status: "success",
    user: req.user
  });
});

// Test route for health check
router.get("/test", (req, res) => {
  res.send("Auth route is working!");
});

// Optional logout endpoint
router.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logged out (client must delete token)." });
});

module.exports = router;
