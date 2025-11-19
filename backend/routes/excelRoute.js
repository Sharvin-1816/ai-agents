const express = require("express");
const router = express.Router();
const multer = require("multer");

// Use memory storage (file stored only in RAM)
const storage = multer.memoryStorage();
const upload = multer({ storage:multer.memoryStorage() });

// Controller
const { uploadExcel } = require("../controllers/excelBatchController");

// Route: POST /api/upload-excel
router.post("/upload-excel", upload.single("file"), uploadExcel);

module.exports = router;
