const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Add other fields as needed (e.g. profilePic, phoneNumber, etc.)
}, {
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema);
