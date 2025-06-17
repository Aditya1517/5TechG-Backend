const Admin = require("../models/Admin");

exports.updateAdminProfile = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { name, username, password } = req.body;

    if (!username) {
      return res.status(400).json({ status: "error", message: "Username is required" });
    }

    const updateData = { username };
    if (password) {
      const bcrypt = require("bcryptjs");
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updated = await Admin.findByIdAndUpdate(adminId, updateData, { new: true }).select("-password");
    if (!updated) return res.status(404).json({ status: "error", message: "Admin not found" });

    res.status(200).json({ status: "success", message: "Admin profile updated", admin: updated });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
