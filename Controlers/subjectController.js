const Subject = require('../models/subjectModel');
const Class = require('../models/classModel');
const Topic = require('../models/topicModel');

// Create a new subject
const createSubject = async (req, res) => {
    try {
        // Get the class ID from the request body or request parameters
        const classId = req.body.classId || req.params.classId;

        // Check if the class ID is provided
        if (!classId) {
            return res.status(400).json({ error: 'Class ID is required' });
        }

        // Check if the class exists
        const foundClass = await Class.findById(classId);
        if (!foundClass) {
            return res.status(404).json({ error: 'Class not found' });
        }

        // Create the new subject instance using the request body
        const newSubject = await Subject.create({ ...req.body, class: classId });

        console.log("Subject created:", newSubject);
        res.status(201).json(newSubject);
    } catch (error) {
        console.error("Error creating subject:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// Get all subjects
const getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find().populate('class');
        console.log("Subjects retrieved:", subjects);
        res.status(200).json(subjects);
    } catch (error) {
        console.error("Error retrieving subjects:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// Get subject by ID
const getSubjectById = async (req, res) => {
    try {
        const foundSubject = await Subject.findById(req.params.id).populate('class');
        if (!foundSubject) {
            console.log("Subject not found:", req.params.id);
            return res.status(404).json({ message: "Subject not found" });
        }

        // Populate topics associated with this subject
        const topics = await Topic.find({ subject: req.params.id });
        console.log("Subject and its topics retrieved:", { foundSubject, topics });
        res.status(200).json({ foundSubject, topics });
    } catch (error) {
        console.error("Error retrieving subject by ID:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// Update subject by ID
const updateSubjectById = async (req, res) => {
    try {
        const updatedSubject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('class');
        if (!updatedSubject) {
            console.log("Subject not found for update:", req.params.id);
            return res.status(404).json({ message: "Subject not found" });
        }
        console.log("Subject updated:", updatedSubject);
        res.status(200).json(updatedSubject);
    } catch (error) {
        console.error("Error updating subject:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// Delete subject by ID
const deleteSubjectById = async (req, res) => {
    try {
        const deletedSubject = await Subject.findByIdAndDelete(req.params.id).populate('class');
        if (!deletedSubject) {
            console.log("Subject not found for deletion:", req.params.id);
            return res.status(404).json({ message: "Subject not found" });
        }
        console.log("Subject deleted:", deletedSubject);
        res.status(200).json({ message: "Subject deleted successfully" });
    } catch (error) {
        console.error("Error deleting subject:", error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createSubject,
    getAllSubjects,
    getSubjectById,
    updateSubjectById,
    deleteSubjectById
};
