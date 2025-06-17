const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const authenticateToken = require("../middleware/authenticateToken"); // <-- Import your auth middleware

// Login route with validation
router.post(
  "/login",
  [
    body("username", "Username is required").notEmpty(),
    body("password", "Password is required").notEmpty(),
  ],
  validate,
  login
);

// Profile route (requires authentication)
router.get("/profile", authenticateToken, (req, res) => {
  res.json(req.user); // req.user should be set by your auth middleware
});

router.get("/test", (req, res) => {
  res.send("Auth route is working!");
});

module.exports = router;