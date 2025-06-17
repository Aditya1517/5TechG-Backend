const Vehicle = require("../models/Vehicle");
const cloudinary = require("../config/cloudinary");

// Add a new vehicle
exports.addVehicle = async (req, res) => {
  try {
    const files = req.files;
    const imageUrls = [];

    // Upload images to Cloudinary
    for (const file of files) {
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "jivhala-vehicles"
      });
      imageUrls.push(uploadResult.secure_url);
    }

    const {
      vehicleNumber,
      hp,
      chassisNumber,
      engineNumber,
      vehicleName,
      modelYear,       // ✅ FIXED
      ownership,       // ✅ FIXED
      insuranceDate,
      ownerName,
      ownerNumber,
      mobileNumber,
      challan,
      rc,
      puc,
      noc,
      inDate
    } = req.body;

    // Basic required field validation
    if (!vehicleNumber || !chassisNumber || !engineNumber || !vehicleName || !modelYear || !ownership) {
      return res.status(400).json({ message: "Required vehicle fields are missing." });
    }

    const newVehicle = new Vehicle({
      vehicleNumber,
      hp,
      chassisNumber,
      engineNumber,
      vehicleName,
      modelYear,     // ✅ INCLUDED
      ownership,     // ✅ INCLUDED
      insuranceDate,
      ownerName,
      ownerNumber,
      mobileNumber,
      challan,
      rc,
      puc,
      noc,
      inDate,
      images: imageUrls
    });

    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (err) {
    console.error("Add vehicle error:", err.message);
    res.status(400).json({ message: "Failed to add vehicle", error: err.message });
  }
};

// Get all vehicles
exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate("buyer").lean();
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch vehicles", error: err.message });
  }
};

// Get a single vehicle by ID
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).populate("buyer").lean();
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json(vehicle);
  } catch (err) {
    res.status(400).json({ message: "Invalid vehicle ID" });
  }
};

// Mark a vehicle as out (sold)
exports.vehicleOut = async (req, res) => {
  try {
    const update = {
      isSold: true,
      outInfo: req.body
    };

    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, update, { new: true });
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
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete vehicle", error: err.message });
  }
};
