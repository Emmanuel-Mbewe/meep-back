// controllers/classController.js
const Class = require('../models/classModel');
const Subject = require('../models/subjectModel');

// Create a new class
const createClass = async (req, res) => {
    try {
        const newClass = await Class.create(req.body);
        console.log("Class created:", newClass);
        res.status(201).json(newClass);
    } catch (error) {
        console.error("Error creating class:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// Get all classes
const getAllClasses = async (req, res) => {
    try {
        const classes = await Class.find();
        console.log("Classes retrieved:", classes);
        res.status(200).json(classes);
    } catch (error) {
        console.error("Error retrieving classes:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// Get class by ID
const getClassById = async (req, res) => {
    try {
        const foundClass = await Class.findById(req.params.id);
        if (!foundClass) {
            console.log("Class not found:", req.params.id);
            return res.status(404).json({ message: "Class not found" });
        }

        // Populate subjects associated with this class
        const subjects = await Subject.find({ class: req.params.id });
        console.log("Class and its subjects retrieved:", { foundClass, subjects });
        res.status(200).json({ foundClass, subjects });
    } catch (error) {
        console.error("Error retrieving class by ID:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// Update class by ID
const updateClassById = async (req, res) => {
    try {
        const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedClass) {
            console.log("Class not found for update:", req.params.id);
            return res.status(404).json({ message: "Class not found" });
        }
        console.log("Class updated:", updatedClass);
        res.status(200).json(updatedClass);
    } catch (error) {
        console.error("Error updating class:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// Delete class by ID
const deleteClassById = async (req, res) => {
    try {
        const deletedClass = await Class.findByIdAndDelete(req.params.id);
        if (!deletedClass) {
            console.log("Class not found for deletion:", req.params.id);
            return res.status(404).json({ message: "Class not found" });
        }
        console.log("Class deleted:", deletedClass);
        res.status(200).json({ message: "Class deleted successfully" });
    } catch (error) {
        console.error("Error deleting class:", error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createClass,
    getAllClasses,
    getClassById,
    updateClassById,
    deleteClassById
};
