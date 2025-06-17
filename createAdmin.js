const mongoose = require("mongoose");
const Admin = require("./models/Admin");
require("dotenv").config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const username = process.env.ADMIN_USERNAME || "admin1";
    const password = process.env.ADMIN_PASSWORD || "987654321";

    const existing = await Admin.findOne({ username });
    if (existing) {
      console.log("Admin user already exists.");
      return;
    }

    const admin = new Admin({ username, password });
    await admin.save();

    console.log("✅ Admin user created successfully!");
  } catch (err) {
    console.error("❌ Failed to create admin:", err.message);
  } finally {
    mongoose.disconnect();
  }
}

createAdmin();
