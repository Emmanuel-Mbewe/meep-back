const express = require('express');
const { createStudentResponse, getAllStudentResponses, getStudentResponseById, updateStudentResponseById, deleteStudentResponseById } = require('../Controlers/testResponseController');
const router = express.Router();

// Define routes
router.post('/', createStudentResponse);
router.get('/', getAllStudentResponses);
router.get('/:id', getStudentResponseById);
router.put('/:id', updateStudentResponseById);
router.delete('/:id', deleteStudentResponseById);

module.exports = router;
