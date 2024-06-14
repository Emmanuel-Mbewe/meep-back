const Tutor = require('../models/tutorModel');
const Contacts = require('../models/contactsModel');
const CustomerFeedback = require('../models/customerFeedback');
const TutorSubjects = require('../models/tutorSubjects');

// Create a new tutor
const createTutor = async (req, res) => {
    try {
        const newTutor = await Tutor.create(req.body);
        res.status(201).json(newTutor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all tutors
const getAllTutors = async (req, res) => {
    try {
        const tutors = await Tutor.find();
        res.status(200).json(tutors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get tutor by ID
const getTutorById = async (req, res) => {
    try {
        const tutor = await Tutor.findById(req.params.id);
        if (!tutor) {
            return res.status(404).json({ message: 'Tutor not found' });
        }
        const contacts = await Contacts.find({ tutor: req.params.id });
        const comments = await CustomerFeedback.find({ tutor: req.params.id });
        const subjects = await TutorSubjects.find({ tutor: req.params.id });
        res.status(200).json({ tutor, contacts, comments, subjects });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update tutor by ID
const updateTutorById = async (req, res) => {
    try {
        const updatedTutor = await Tutor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedTutor) {
            return res.status(404).json({ message: 'Tutor not found' });
        }
        res.status(200).json(updatedTutor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete tutor by ID
const deleteTutorById = async (req, res) => {
    try {
        const deletedTutor = await Tutor.findByIdAndDelete(req.params.id);
        if (!deletedTutor) {
            return res.status(404).json({ message: 'Tutor not found' });
        }
        res.status(200).json(deletedTutor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createTutor,
    getAllTutors,
    getTutorById,
    updateTutorById,
    deleteTutorById,
};
