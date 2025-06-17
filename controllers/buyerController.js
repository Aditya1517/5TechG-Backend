const Buyer = require("../models/Buyer");
const Vehicle = require("../models/Vehicle");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const generateBuyerPDF = require("../utils/generatePDF");

exports.vehicleOut = async (req, res) => {
  try {
    const { vehicleId } = req.body;

    // Safely parse buyerInfo if present
    let buyerInfo = {};
    if (req.body.buyerInfo) {
      try {
        buyerInfo = JSON.parse(req.body.buyerInfo);
      } catch (parseErr) {
        return res.status(400).json({ message: "Invalid buyerInfo JSON", error: parseErr.message });
      }
    } else {
      return res.status(400).json({ message: "buyerInfo is required" });
    }

    let imageUrl = "";

    // Handle Image Upload (optional)
    if (req.file?.path) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "jivhala-buyers",
      });
      imageUrl = uploadResult.secure_url;

      // Remove temp file after upload, only if it's a local file
      if (req.file.path && !req.file.path.startsWith("http")) {
        fs.unlinkSync(req.file.path);
      }
    }

    // Create Buyer
    const buyer = new Buyer({
      ...buyerInfo,
      vehicle: vehicleId,
      imageUrl,
    });
    await buyer.save();

    // Update vehicle
    await Vehicle.findByIdAndUpdate(vehicleId, {
      isSold: true,
      buyer: buyer._id,
    });

    res.status(201).json({ message: "Vehicle out successful", buyer });
  } catch (err) {
    res.status(500).json({ message: "Vehicle out failed", error: err.message });
  }
};

exports.generateBuyerPDF = async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.params.id);
    if (!buyer) return res.status(404).send("Buyer not found");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=buyer.pdf");
    generateBuyerPDF(buyer, res);
  } catch (err) {
    res.status(500).json({ message: "Failed to generate PDF", error: err.message });
  }
};