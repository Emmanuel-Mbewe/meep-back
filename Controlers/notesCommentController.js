const NotesComment = require('../models/notesCommentModel'); // Import the NotesComment model
const Subtopic = require('../models/subTopic'); // Import the Subtopic model (if needed for reference checks)

// Create a new notes comment
const createNotesComment = async (req, res) => {
    try {
        const subtopicId = req.body.subtopic;

        const foundSubtopic = await Subtopic.findById(subtopicId);
        if (!foundSubtopic) {
            return res.status(404).json({ error: 'Subtopic not found' });
        }

        const newNotesComment = new NotesComment(req.body);
        const savedNotesComment = await newNotesComment.save();

        res.status(201).json(savedNotesComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all notes comments
const getAllNotesComments = async (req, res) => {
    try {
        const notesComments = await NotesComment.find().populate('subtopic');
        res.status(200).json(notesComments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get notes comment by ID
const getNotesCommentById = async (req, res) => {
    try {
        const foundNotesComment = await NotesComment.findById(req.params.id).populate('subtopic');
        if (!foundNotesComment) {
            return res.status(404).json({ message: "Notes comment not found" });
        }
        res.status(200).json(foundNotesComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all comments for a subtopic by subtopic ID
const getCommentsBySubtopicId = async (req, res) => {
    try {
        const comments = await NotesComment.find({ subtopic: req.params.subtopicId });
        if (!comments) {
            return res.status(404).json({ message: "No comments found for this subtopic" });
        }
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update notes comment by ID
const updateNotesCommentById = async (req, res) => {
    try {
        const updatedNotesComment = await NotesComment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedNotesComment) {
            return res.status(404).json({ message: "Notes comment not found" });
        }
        res.status(200).json(updatedNotesComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete notes comment by ID
const deleteNotesCommentById = async (req, res) => {
    try {
        const deletedNotesComment = await NotesComment.findByIdAndDelete(req.params.id);
        if (!deletedNotesComment) {
            return res.status(404).json({ message: "Notes comment not found" });
        }
        res.status(200).json({ message: "Notes comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createNotesComment,
    getAllNotesComments,
    getNotesCommentById,
    getCommentsBySubtopicId,
    updateNotesCommentById,
    deleteNotesCommentById
};
