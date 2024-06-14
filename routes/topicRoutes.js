// routes/topicRoutes.js
const express = require('express');
const router = express.Router();
const topicController = require('../controlers/topicController');

// Create a new topic
router.post('/', topicController.createTopic);

// Get all topics
router.get('/', topicController.getAllTopics);

// Get topic by ID
router.get('/:id', topicController.getTopicById);

// Update topic by ID
router.put('/:id', topicController.updateTopicById);

// Delete topic by ID
router.delete('/:id', topicController.deleteTopicById);

module.exports = router;
