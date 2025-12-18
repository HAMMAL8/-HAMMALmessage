const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../services/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "hammalmessage",
    resource_type: "auto"
  }
});

module.exports = multer({ storage });
