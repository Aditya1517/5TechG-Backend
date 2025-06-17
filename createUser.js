// createUser.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User");

// Load environment variables
dotenv.config();

async function createUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const name = process.env.SEED_USER_NAME || "Test User";
    const email = process.env.SEED_USER_EMAIL || "test@example.com";
    const rawPassword = process.env.SEED_USER_PASSWORD || "password123";

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      console.log("⚠️  User already exists.");
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(rawPassword, salt);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    console.log(`✅ User created: ${email}`);
  } catch (err) {
    console.error("❌ Error creating user:", err.message);
  } finally {
    mongoose.disconnect();
  }
}

createUser();
