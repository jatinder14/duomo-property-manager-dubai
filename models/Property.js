const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: { type: String },
    category: { type: String, required: true },
    description: { type: String },
    keyTechnicalData: { type: String, required: true },
    featuresApplications: [
        {
            key: { type: String },
            value: { type: String }
        }
    ],
    logo: { type: String },
    images: [{ type: String }],

}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
