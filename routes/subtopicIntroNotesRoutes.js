// routes/notesRoutes.js
const express = require('express');
const { createNote, getAllNotes, getNoteById, updateNoteById, deleteNoteById } = require('../Controlers/subtopicNotesIntroController');
const router = express.Router();

router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.put('/:id', updateNoteById);
router.delete('/:id', deleteNoteById);

module.exports = router;
