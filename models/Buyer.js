const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
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
    maxlength: 12,
    minlength: 12
  },
  pan: {
    type: String,
    uppercase: true,
    minlength: 10,
    maxlength: 10
  },
  email: {
    type: String,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
  },
  outDate: {
    type: Date,
    default: Date.now
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true
  },
  imageUrl: {
    type: String
  }
});

module.exports = mongoose.model("Buyer", buyerSchema);
