const express = require('express');
const cors = require('cors');
const connectDB = require('./Database/connection');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/properties');
const contactUsRoutes = require('./routes/contactUs');
const uploadRoutes = require('./routes/upload');

dotenv.config();
connectDB();

const app = express();
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Server health check
app.get('/', (req, res) => {
    res.send('Duomo Admin Portal Backend');
});

// Auth Routes
app.use('/api/auth', authRoutes);
app.use('/mvl/api/properties', propertyRoutes);
app.use('/mvl/api/contact', contactUsRoutes);
app.use('/upload', uploadRoutes);

// Serve the uploaded files as static files
app.use('/uploads', express.static('uploads'));
