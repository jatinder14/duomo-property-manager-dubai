const express = require('express');
const Property = require('../models/Property');
const router = express.Router();

app.post('/properties', async (req, res) => {
    try {
        const property = new Property(req.body);
        await property.save();
        res.status(201).json(property);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/properties', async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/properties/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ message: 'Property not found' });
        res.status(200).json(property);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/properties/:id', async (req, res) => {
    try {
        const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!property) return res.status(404).json({ message: 'Property not found' });
        res.status(200).json(property);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/properties/:id', async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);
        if (!property) return res.status(404).json({ message: 'Property not found' });
        res.status(200).json({ message: 'Property deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
