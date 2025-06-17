const mongoose = require("mongoose");
const Admin = require("./models/Admin");
require("dotenv").config();

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI);

  const username = "admin1";
  const password = "987654321";

  const admin = new Admin({ username, password });
  await admin.save();

  console.log("Admin user created!");
  mongoose.disconnect();
}

createAdmin();