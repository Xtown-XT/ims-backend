// import multer from "multer";
// import path from "path";
// import fs from "fs";

// // Define storage folder
// const uploadDir = path.join(process.cwd(), "uploads", "employees");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
//     cb(null, uniqueName);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only .jpg, .jpeg, .png, and .webp formats allowed"), false);
//   }
// };

// export const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
//   fileFilter,
// });


// src/middleware/upload.js
import multer from "multer";
import path from "path";
import fs from "fs";

const makeDirIfNotExists = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

/**
 * returns a multer middleware for a single file
 * @param {string} fieldName - form-data field name for the file (default: "image")
 * @param {string} subfolder - subfolder under /uploads to store files (default: "uploads")
 */
export const uploadSingle = (fieldName = "image", subfolder = "uploads") => {
  const uploadDir = path.join(process.cwd(), "uploads", subfolder);
  makeDirIfNotExists(uploadDir);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext).replace(/\s+/g, "_");
      const filename = `${Date.now()}_${Math.round(Math.random() * 1e9)}_${name}${ext}`;
      cb(null, filename);
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) return cb(null, true);
    cb(new Error("Only .jpg, .jpeg, .png, and .webp formats allowed"), false);
  };

  return multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    fileFilter,
  }).single(fieldName);
};

export default uploadSingle;
