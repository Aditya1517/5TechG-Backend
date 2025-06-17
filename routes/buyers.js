const express = require("express");
const router = express.Router();

const {
  vehicleOut,
  generateBuyerPDF,
  getBuyerById,
  getAllBuyers,
  updateBuyer,
  deleteBuyer,
  getBuyersByVehicle
} = require("../controllers/buyerController");

const auth = require("../middleware/authMiddleware");
const { uploadSingle } = require("../middleware/uploadMiddleware");

// @route   POST /api/buyers/out
// @desc    Mark a vehicle as sold, create buyer entry, and upload buyer image
// @access  Protected
router.post("/out", auth, uploadSingle.single("image"), vehicleOut);

// @route   GET /api/buyers/:id/pdf
// @desc    Generate PDF for a specific buyer by ID
// @access  Protected
router.get("/:id/pdf", auth, generateBuyerPDF);

// @route   GET /api/buyers/:id
// @desc    Get a single buyer by ID
// @access  Protected
router.get("/:id", auth, getBuyerById);

// @route   GET /api/buyers/
// @desc    Get all buyers
// @access  Protected
router.get("/", auth, getAllBuyers);

// @route   PUT /api/buyers/:id
// @desc    Update a buyer
// @access  Protected
router.put("/:id", auth, uploadSingle.single("image"), updateBuyer);

// @route   DELETE /api/buyers/:id
// @desc    Delete a buyer and unlink from vehicle
// @access  Protected
router.delete("/:id", auth, deleteBuyer);

// @route   GET /api/buyers/vehicle/:vehicleId
// @desc    Get all buyers associated with a vehicle
// @access  Protected
router.get("/vehicle/:vehicleId", auth, getBuyersByVehicle);

module.exports = router;
