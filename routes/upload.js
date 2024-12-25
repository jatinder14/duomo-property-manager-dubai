const multer = require('multer');
const express = require('express');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the directory where files will be stored
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // Extract file extension
        cb(null, Date.now() + ext); // Use timestamp for the filename
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    res.status(200).json({
        message: 'File uploaded successfully!',
        filePath: `/uploads/${req.file.filename}` // Send the file path as a response
    });
});

module.exports = router;
