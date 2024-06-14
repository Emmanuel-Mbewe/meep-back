// routes/classRoutes.js
const express = require('express');
const router = express.Router();
const classController = require('../Controlers/classController');

// Create a new class
router.post('/', classController.createClass);

// Get all classes
router.get('/', classController.getAllClasses);

// Get class by ID
router.get('/:id', classController.getClassById);

// Update class by ID
router.put('/:id', classController.updateClassById);

// Delete class by ID
router.delete('/:id', classController.deleteClassById);

module.exports = router;
