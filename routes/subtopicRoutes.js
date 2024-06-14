// routes/subtopicRoutes.js
const express = require('express');
const router = express.Router();
const subtopicController = require('../Controlers/subtopicController');

// Create a new subtopic
router.post('/', subtopicController.createSubtopic);

// Get all subtopics
router.get('/', subtopicController.getAllSubtopics);

// Get subtopic by ID
router.get('/:id', subtopicController.getSubtopicById);

// Update subtopic by ID
router.put('/:id', subtopicController.updateSubtopicById);

// Delete subtopic by ID
router.delete('/:id', subtopicController.deleteSubtopicById);

router.get('/:subtopicId/comments', subtopicController.getCommentsBySubtopicId); 

module.exports = router;
