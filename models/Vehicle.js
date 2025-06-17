const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    unique: true // assuming vehicle numbers are unique
  },
  hp: {
    type: Number,
    min: 0
  },
  chassisNumber: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  engineNumber: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  insuranceDate: {
    type: Date
  },
  ownerName: {
    type: String,
    trim: true,
    required: true
  },
  mobileNumber: {
    type: String,
    match: [/^\d{10}$/, 'Mobile number must be 10 digits'],
    required: true
  },
  isSold: {
    type: Boolean,
    default: false
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Buyer"
  },
  images: [
    {
      type: String // Cloudinary URLs of vehicle images
    }
  ]
});

module.exports = mongoose.model("Vehicle", vehicleSchema);