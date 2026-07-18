import multer from "multer";
import path from "path";
import fs from "fs";

/**
 * ==========================================
 * Upload Directory
 * ==========================================
 */

const uploadPath = "uploads/";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, {
    recursive: true,
  });
}

/**
 * ==========================================
 * Storage
 * ==========================================
 */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName +
        path.extname(file.originalname)
    );
  },
});

/**
 * ==========================================
 * File Filter
 * ==========================================
 */

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  cb(
    new Error(
      "Only JPG, PNG, WEBP and PDF files are allowed."
    )
  );
};

/**
 * ==========================================
 * Multer Upload
 * ==========================================
 */

const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export default upload;