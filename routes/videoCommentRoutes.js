const express = require('express');
const { createVideoComment, getAllVideoComments, getVideoCommentById, getCommentsByVideoId, updateVideoCommentById, deleteVideoCommentById } = require('../Controlers/videoCommentController');
const router = express.Router();

router.post('/', createVideoComment);
router.get('/', getAllVideoComments);
router.get('/:id', getVideoCommentById);
router.get('/video/:videoId', getCommentsByVideoId); // Route to get comments by video ID
router.put('/:id', updateVideoCommentById);
router.delete('/:id', deleteVideoCommentById);

module.exports = router;
