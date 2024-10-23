const express = require('express');
const cors = require('cors');
const connectDB = require('./Database/connection');
const dotenv = require('dotenv');
const multer = require('multer');
const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/properties');
const userRoutes = require('./routes/User');
const UploadController = require('./controllers/uploadController');
const StatusCodes = require('./constants/statusCode')

dotenv.config();
connectDB();

const app = express();
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // limit file size to 5MB
    },
});

const uploadController = new UploadController();

// Server health check
app.get('/', (req, res) => {
    res.send('Duomo Admin Portal Backend');
});

// s3 routes
app.post('/getSignUrlForUpload',
    upload.single('file'),
    uploadController.upload);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Auth Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/user', userRoutes);
