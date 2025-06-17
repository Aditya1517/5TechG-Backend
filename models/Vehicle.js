const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    unique: true,
    index: true
  },
  hp: {
    type: Number,
    min: 0
  },
  chassisNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  engineNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  vehicleName: {
    type: String,
    required: true,
    trim: true
  },
  modelYear: {
    type: Number,
    required: true,
    min: 1950,
    max: new Date().getFullYear()
  },
  ownerName: {
    type: String,
    required: true,
    trim: true
  },
  ownerNumber: {
    type: String,
    match: [/^\d{10}$/, 'Owner number must be 10 digits']
  },
  ownership: {
    type: String,
    required: true,
    trim: true
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Mobile number must be 10 digits']
  },
  challan: {
    type: String,
    trim: true
  },
  rc: {
    type: String,
    trim: true
  },
  puc: {
    type: String,
    trim: true
  },
  noc: {
    type: String,
    trim: true
  },
  isRcAvailable: {
    type: Boolean,
    default: false
  },
  isPucAvailable: {
    type: Boolean,
    default: false
  },
  isNocAvailable: {
    type: Boolean,
    default: false
  },
  insuranceDate: {
    type: Date
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
      type: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Vehicle", vehicleSchema);
