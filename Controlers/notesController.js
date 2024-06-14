// controllers/notesController.js
const Notes = require('../models/notesModel');

// Create a new note
const createNote = async (req, res) => {
    try {
        const newNote = await Notes.create(req.body);
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all notes
const getAllNotes = async (req, res) => {
    try {
        const notes = await Notes.find()
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
        const foundNote = await Notes.findById(req.params.id);
        if (!foundNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(foundNote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update note by ID
const updateNoteById = async (req, res) => {
    try {
        const updatedNote = await Notes.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete note by ID
const deleteNoteById = async (req, res) => {
    try {
        const deletedNote = await Notes.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note deleted successfully" });
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
