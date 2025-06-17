const express = require("express");
const router = express.Router();
const {
  getVehicles,
  addVehicle,
  deleteVehicle,
  getVehicleById,
  vehicleOut // <-- import the new controller
} = require("../controllers/vehicleController");

const auth = require("../middleware/authMiddleware");
const { uploadMultiple } = require("../middleware/uploadMiddleware");

// Get all vehicles
router.get("/", auth, getVehicles);

// Get a single vehicle by ID
router.get("/:id", auth, getVehicleById);

// Add a vehicle with multiple image upload
router.post("/", auth, uploadMultiple.array("images", 5), addVehicle);

// Mark a vehicle as out (sold) and save buyer info
router.post("/:id/out", auth, vehicleOut);

// Delete a vehicle by ID
router.delete("/:id", auth, deleteVehicle);

module.exports = router;