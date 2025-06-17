const Buyer = require("../models/Buyer");
const Vehicle = require("../models/Vehicle");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const generateBuyerPDF = require("../utils/generatePDF");

exports.vehicleOut = async (req, res) => {
  try {
    const { vehicleId } = req.body;

    if (!vehicleId) {
      return res.status(400).json({ message: "vehicleId is required" });
    }

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

    if (!buyerInfo.name || !buyerInfo.phoneNumber) {
      return res.status(400).json({ message: "Buyer name and phone are required" });
    }

    let imageUrl = "";
    let public_id = "";

    if (req.file?.path) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "jivhala-buyers",
      });
      imageUrl = uploadResult.secure_url;
      public_id = uploadResult.public_id;

      try {
        if (!req.file.path.startsWith("http")) {
          await fs.promises.unlink(req.file.path);
        }
      } catch (unlinkErr) {
        console.warn("Failed to delete temp image file:", unlinkErr.message);
      }
    }

    const buyer = new Buyer({
      ...buyerInfo,
      vehicle: vehicleId,
      imageUrl,
      cloudinaryPublicId: public_id, // Store for deletion later
    });
    await buyer.save();

    await Vehicle.findByIdAndUpdate(vehicleId, {
      isSold: true,
      buyer: buyer._id,
    });

    if (process.env.NODE_ENV !== "production") {
      console.log("Buyer created:", buyer);
    }

    res.status(201).json({ message: "Vehicle out successful", buyer });
  } catch (err) {
    res.status(500).json({ message: "Vehicle out failed", error: err.message });
  }
};

exports.generateBuyerPDF = async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.params.id);
    if (!buyer) return res.status(404).send("Buyer not found");

    // Set correct headers before piping
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=buyer.pdf");

    generateBuyerPDF(buyer, res); // 🔥 Do NOT await or call res.end()
  } catch (err) {
    console.error("PDF generation error:", err.message);
    res.status(500).json({ message: "Failed to generate PDF", error: err.message });
  }
};

exports.getAllBuyers = async (req, res) => {
  try {
    const filters = {};
    if (req.query.name) filters.name = new RegExp(req.query.name, "i");

    const buyers = await Buyer.find(filters).populate("vehicle");
    res.status(200).json(buyers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch buyers", error: err.message });
  }
};

exports.getBuyerById = async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.params.id).populate("vehicle");
    if (!buyer) return res.status(404).json({ message: "Buyer not found" });

    res.status(200).json(buyer);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch buyer", error: err.message });
  }
};

exports.updateBuyer = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No data provided for update" });
    }

    const existingBuyer = await Buyer.findById(id);
    if (!existingBuyer) return res.status(404).json({ message: "Buyer not found" });

    if (req.file?.path) {
      // Delete old image if it exists
      if (existingBuyer.cloudinaryPublicId) {
        try {
          await cloudinary.uploader.destroy(existingBuyer.cloudinaryPublicId);
        } catch (err) {
          console.warn("Failed to delete old image from Cloudinary:", err.message);
        }
      }

      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "jivhala-buyers",
      });
      updateData.imageUrl = uploadResult.secure_url;
      updateData.cloudinaryPublicId = uploadResult.public_id;

      try {
        if (!req.file.path.startsWith("http")) {
          await fs.promises.unlink(req.file.path);
        }
      } catch (unlinkErr) {
        console.warn("Failed to delete temp image file:", unlinkErr.message);
      }
    }

    const updatedBuyer = await Buyer.findByIdAndUpdate(id, updateData, { new: true }).populate("vehicle");
    res.status(200).json(updatedBuyer);
  } catch (err) {
    res.status(500).json({ message: "Failed to update buyer", error: err.message });
  }
};

exports.deleteBuyer = async (req, res) => {
  try {
    const { id } = req.params;
    const buyer = await Buyer.findByIdAndDelete(id);
    if (!buyer) return res.status(404).json({ message: "Buyer not found" });

    if (buyer.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(buyer.cloudinaryPublicId);
      } catch (err) {
        console.warn("Failed to delete buyer image from Cloudinary:", err.message);
      }
    }

    await Vehicle.findByIdAndUpdate(buyer.vehicle, { isSold: false, buyer: null });

    res.status(200).json({ message: "Buyer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete buyer", error: err.message });
  }
};

exports.getBuyersByVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const buyers = await Buyer.find({ vehicle: vehicleId }).populate("vehicle");
    if (!buyers || buyers.length === 0) {
      return res.status(404).json({ message: "No buyers found for this vehicle" });
    }
    res.status(200).json(buyers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch buyers", error: err.message });
  }
};
