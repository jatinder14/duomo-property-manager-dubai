// MVL
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    video: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
