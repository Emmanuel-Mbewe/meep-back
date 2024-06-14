const express = require('express');
const { createTestQuestionMarks, getAllTestQuestionMarks, getTestQuestionMarksById, updateTestQuestionMarksById, deleteTestQuestionMarksById, getStudentMarksForQuestion } = require('../Controlers/testQuestionMarksController');
const router = express.Router();

// Define routes
router.post('/', createTestQuestionMarks);
router.get('/', getAllTestQuestionMarks);
router.get('/:id', getTestQuestionMarksById);
router.put('/:id', updateTestQuestionMarksById);
router.delete('/:id', deleteTestQuestionMarksById);
router.get('/question/:questionId', getStudentMarksForQuestion);

module.exports = router;
