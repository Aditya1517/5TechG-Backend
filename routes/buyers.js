const express = require("express");
const router = express.Router();
const {
  vehicleOut,
  generateBuyerPDF
} = require("../controllers/buyerController");

const auth = require("../middleware/authMiddleware");
const { uploadSingle } = require("../middleware/uploadMiddleware"); // <-- fix here

// Use multer to handle file uploads (e.g., image of buyer's Aadhar/PAN)
router.post("/out", auth, uploadSingle.single("image"), vehicleOut);

router.get("/:id/pdf", auth, generateBuyerPDF);

module.exports = router;