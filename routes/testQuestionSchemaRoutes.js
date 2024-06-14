const express = require('express');
const { createTestQuestion, getAllTestQuestions, getTestQuestionById, updateTestQuestionById, deleteTestQuestionById } = require('../Controlers/testQuestionSchemaController');
const router = express.Router();

// Define routes
router.post('/', createTestQuestion);
router.get('/', getAllTestQuestions);
router.get('/:id', getTestQuestionById);
router.put('/:id', updateTestQuestionById);
router.delete('/:id', deleteTestQuestionById);

module.exports = router;
