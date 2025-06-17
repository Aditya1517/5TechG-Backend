const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Only allow image uploads
const imageFileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    const error = new Error("Only image files are allowed!");
    error.code = "LIMIT_FILE_TYPE";
    cb(error, false);
  } else {
    cb(null, true);
  }
};

// Multer configuration
const multerOptions = {
  limits: {
    fileSize: 5 * 1024 * 1024, // Max size: 5MB
  },
  fileFilter: imageFileFilter,
};

// Storage for buyer/profile images
const singleStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "jivhala_buyer_photos",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// Storage for vehicle images
const multipleStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "jivhala_vehicle_photos",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// Export middlewares
const uploadSingle = multer({
  storage: singleStorage,
  ...multerOptions,
});

const uploadMultiple = multer({
  storage: multipleStorage,
  ...multerOptions,
});

module.exports = {
  uploadSingle,    // for routes like POST /buyer
  uploadMultiple,  // for routes like POST /vehicles
};
