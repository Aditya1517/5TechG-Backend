const express = require("express");
const router = express.Router();

const {
  getVehicles,
  addVehicle,
  deleteVehicle,
  getVehicleById,
  vehicleOut
} = require("../controllers/vehicleController");

const auth = require("../middleware/authMiddleware");
const { uploadMultiple } = require("../middleware/uploadMiddleware");

// @route   GET /api/vehicles/
// @desc    Fetch all vehicles
// @access  Private
router.get("/", auth, getVehicles);

// @route   GET /api/vehicles/:id
// @desc    Get details of a single vehicle by ID
// @access  Private
router.get("/:id", auth, getVehicleById);

// @route   POST /api/vehicles/
// @desc    Add a new vehicle with up to 10 images
// @access  Private
router.post("/", auth, uploadMultiple.array("images", 10), addVehicle);

// @route   POST /api/vehicles/:id/out
// @desc    Mark a vehicle as sold and attach buyer info
// @access  Private
router.post("/:id/out", auth, vehicleOut);

// @route   DELETE /api/vehicles/:id
// @desc    Permanently delete a vehicle record by ID
// @access  Private
router.delete("/:id", auth, deleteVehicle);

module.exports = router;
