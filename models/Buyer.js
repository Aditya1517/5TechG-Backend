const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Phone number must be 10 digits']
  },
  isIDVerified: {
    type: Boolean,
    default: false
  },
  address: {
    type: String,
    trim: true
  },
  negotiationPrice: {
    type: Number,
    required: true,
    min: 0
  },
  rtoCharges: {
    type: Number,
    default: 0,
    min: 0
  },
  commission: {
    type: Number,
    default: 0,
    min: 0
  },
  token: {
    type: Number,
    default: 0,
    min: 0
  },
  receivedPrice: {
    type: Number,
    default: 0,
    min: 0
  },
  balance: {
    type: Number,
    default: 0,
    min: 0
  },
  aadhar: {
    type: String,
    minlength: 12,
    maxlength: 12,
    trim: true
  },
  pan: {
    type: String,
    minlength: 10,
    maxlength: 10,
    uppercase: true,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
  },
  outDate: {
    type: Date,
    default: Date.now
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
    index: true
  },
  imageUrl: {
    type: String
  },
  cloudinaryPublicId: {
    type: String,
    default: ""
  }
}, { timestamps: true });

module.exports = mongoose.model("Buyer", buyerSchema);
