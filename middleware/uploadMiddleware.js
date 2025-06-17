const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Single image upload (e.g., profile or buyer image)
const singleStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "jivhala_buyer_photos",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// Multiple image upload (e.g., car images)
const multipleStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "jivhala_vehicle_photos",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const uploadSingle = multer({ storage: singleStorage });
const uploadMultiple = multer({ storage: multipleStorage });

module.exports = {
  uploadSingle,     // use for profile/buyer image
  uploadMultiple,   // use for multiple vehicle images
};