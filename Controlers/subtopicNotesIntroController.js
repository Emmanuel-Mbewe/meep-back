// controllers/notesController.js
const subtopicIntroNotes = require('../models/subtopicIntroNotesModel');

// Create a new note
const createNote = async (req, res) => {
    try {
        const newNote = await subtopicIntroNotes.create(req.body);
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all notes
const getAllNotes = async (req, res) => {
    try {
        const notes = await subtopicIntroNotes.find()
            .populate({
                path: 'subtopic',
                populate: { path: 'subtopics' }
            });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get note by ID
const getNoteById = async (req, res) => {
    try {
        const foundNote = await subtopicIntroNotes.findById(req.params.id);
        if (!foundNote) {
            return res.status(404).json({ message: "Subtopic Into Notes not found" });
        }
        res.status(200).json(foundNote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update note by ID
const updateNoteById = async (req, res) => {
    try {
        const updatedNote = await subtopicIntroNotes.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ message: "Subtopic Into Notes not found" });
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete note by ID
const deleteNoteById = async (req, res) => {
    try {
        const deletedNote = await subtopicIntroNotes.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ message: "Subtopic Into Notes not found" });
        }
        res.status(200).json({ message: "Subtopic Into Notes deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createNote,
    getAllNotes,
    getNoteById,
    updateNoteById,
    deleteNoteById
};
