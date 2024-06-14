// routes/subjectRoutes.js
const express = require('express');
const { createSubject, getAllSubjects, getSubjectById, updateSubjectById, deleteSubjectById } = require('../Controlers/subjectController');
const router = express.Router();

// Create a new subject
router.post('/', createSubject);

// Get all subjects
router.get('/', getAllSubjects);

// Get subject by ID
router.get('/:id', getSubjectById);

// Update subject by ID
router.put('/:id', updateSubjectById);

// Delete subject by ID
router.delete('/:id', deleteSubjectById);

module.exports = router;
