import multer from "multer";

// Create Disk Storage
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + Math.round(Math.random() * 100000) + file.originalname
    );
  },
});

// Multer Middleware for Item
export const multerMiddlewareForItem = multer({ storage }).single("itemPhoto");
