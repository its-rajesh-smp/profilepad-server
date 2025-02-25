import multer from "multer";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const storage = multer.memoryStorage();

// Multer middleware
const upload = multer({
  limits: { fileSize: MAX_FILE_SIZE }, // Limit file size to 5MB
  storage,
});

export default upload;
