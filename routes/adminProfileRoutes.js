const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { updateAdminProfile } = require("../controllers/adminProfileController");

router.put("/update", auth, updateAdminProfile);

module.exports = router;
