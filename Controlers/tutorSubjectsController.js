const TutorSubjects = require('../models/tutorSubjects');

// Create a new tutor subject
const createTutorSubject = async (req, res) => {
    try {
        const newTutorSubject = await TutorSubjects.create(req.body);
        res.status(201).json(newTutorSubject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all tutor subjects
const getAllTutorSubjects = async (req, res) => {
    try {
        const tutorSubjects = await TutorSubjects.find().populate('tutor');
        res.status(200).json(tutorSubjects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get tutor subjects by tutor ID
const getTutorSubjectsByTutorId = async (req, res) => {
    try {
        const tutorSubjects = await TutorSubjects.find({ tutor: req.params.tutorId }).populate('tutor');
        if (!tutorSubjects) {
            return res.status(404).json({ message: 'Tutor subjects not found' });
        }
        res.status(200).json(tutorSubjects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update tutor subject by ID
const updateTutorSubjectById = async (req, res) => {
    try {
        const updatedTutorSubject = await TutorSubjects.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedTutorSubject) {
            return res.status(404).json({ message: 'Tutor subject not found' });
        }
        res.status(200).json(updatedTutorSubject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete tutor subject by ID
const deleteTutorSubjectById = async (req, res) => {
    try {
        const deletedTutorSubject = await TutorSubjects.findByIdAndDelete(req.params.id);
        if (!deletedTutorSubject) {
            return res.status(404).json({ message: 'Tutor subject not found' });
        }
        res.status(200).json(deletedTutorSubject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createTutorSubject,
    getAllTutorSubjects,
    getTutorSubjectsByTutorId,
    updateTutorSubjectById,
    deleteTutorSubjectById,
};
