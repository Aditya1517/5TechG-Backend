const Vehicle = require("../models/Vehicle");
const cloudinary = require("../config/cloudinary");

// Add a new vehicle
exports.addVehicle = async (req, res) => {
  try {
    const files = req.files;
    const imageUrls = [];

    // Collect Cloudinary URLs from multer-storage-cloudinary
    for (const file of files) {
      imageUrls.push(file.path); // file.path is the Cloudinary URL
    }

    const vehicle = new Vehicle({ ...req.body, images: imageUrls });
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(400).json({ message: "Failed to add vehicle", error: err.message });
  }
};

// Get all vehicles
exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate("buyer");
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch vehicles", error: err.message });
  }
};

// Get a single vehicle by ID
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).populate("buyer");
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json(vehicle);
  } catch (err) {
    res.status(400).json({ message: "Invalid vehicle ID" });
  }
};

// Mark a vehicle as out (sold) and save buyer info
exports.vehicleOut = async (req, res) => {
  try {
    // You can handle buyer photo upload here if needed
    // Example: req.body contains buyer info, req.file for photo if using multer
    const update = {
      isSold: true,
      outInfo: req.body // Save all buyer info in an "outInfo" field
    };
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json({ message: "Vehicle marked as out", vehicle });
  } catch (err) {
    res.status(400).json({ message: "Failed to mark vehicle as out", error: err.message });
  }
};

// Delete a vehicle by ID
exports.deleteVehicle = async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete vehicle", error: err.message });
  }
};