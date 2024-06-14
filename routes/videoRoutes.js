// routes/videoRoutes.js
const express = require('express');
const router = express.Router();
const videoController = require('../controlers/videoController');

// Create a new video
router.post('/', videoController.createVideo);

// Get all videos
router.get('/', videoController.getAllVideos);

// Get video by ID
router.get('/:id', videoController.getVideoById);

// Update video by ID
router.put('/:id', videoController.updateVideoById);

// Delete video by ID
router.delete('/:id', videoController.deleteVideoById);

// get all comments made on a particular video
router.get('/:videoId/comments', videoController.getCommentsByVideoId);

module.exports = router;
