const express = require('express');
const { createNotesComment, getAllNotesComments, getNotesCommentById, getCommentsBySubtopicId, updateNotesCommentById, deleteNotesCommentById } = require('../Controlers/notesCommentController');
const router = express.Router();

router.post('/', createNotesComment);
router.get('/', getAllNotesComments);
router.get('/:id', getNotesCommentById);
router.get('/subtopic/:subtopicId', getCommentsBySubtopicId); // Route to get comments by subtopic ID
router.put('/:id', updateNotesCommentById);
router.delete('/:id', deleteNotesCommentById);

module.exports = router;
