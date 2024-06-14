const Literacy = require('../models/literacyModel');

const createLiteracy = async (req, res) => {
    try {
        const newLiteracy = await Literacy.create(req.body);
        res.status(201).json(newLiteracy);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllLiteracies = async (req, res) => {
    try {
        const literacies = await Literacy.find();
        res.status(200).json(literacies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getLiteracyById = async (req, res) => {
    try {
        const literacy = await Literacy.findById(req.params.id);
        if (!literacy) {
            return res.status(404).json({ error: 'Literacy not found' });
        }
        res.status(200).json(literacy);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateLiteracyById = async (req, res) => {
    try {
        const updatedLiteracy = await Literacy.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedLiteracy) {
            return res.status(404).json({ error: 'Literacy not found' });
        }
        res.status(200).json(updatedLiteracy);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteLiteracyById = async (req, res) => {
    try {
        const deletedLiteracy = await Literacy.findByIdAndDelete(req.params.id);
        if (!deletedLiteracy) {
            return res.status(404).json({ error: 'Literacy not found' });
        }
        res.status(200).json(deletedLiteracy);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createLiteracy,
    getAllLiteracies,
    getLiteracyById,
    updateLiteracyById,
    deleteLiteracyById
};
