const VideoComment = require('../models/videoCommentModel'); // Import the VideoComment model
const Video = require('../models/videoModel'); // Import the Video model (if needed for reference checks)

// Create a new video comment
const createVideoComment = async (req, res) => {
    try {
        const videoId = req.body.video;

        const foundVideo = await Video.findById(videoId);
        if (!foundVideo) {
            return res.status(404).json({ error: 'Video not found' });
        }

        const newVideoComment = new VideoComment(req.body);
        const savedVideoComment = await newVideoComment.save();

        res.status(201).json(savedVideoComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all video comments
const getAllVideoComments = async (req, res) => {
    try {
        const videoComments = await VideoComment.find().populate('video');
        res.status(200).json(videoComments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get video comment by ID
const getVideoCommentById = async (req, res) => {
    try {
        const foundVideoComment = await VideoComment.findById(req.params.id).populate('video');
        if (!foundVideoComment) {
            return res.status(404).json({ message: "Video comment not found" });
        }
        res.status(200).json(foundVideoComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all comments for a video by video ID
const getCommentsByVideoId = async (req, res) => {
    try {
        const comments = await VideoComment.find({ video: req.params.videoId });
        if (!comments) {
            return res.status(404).json({ message: "No comments found for this video" });
        }
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update video comment by ID
const updateVideoCommentById = async (req, res) => {
    try {
        const updatedVideoComment = await VideoComment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVideoComment) {
            return res.status(404).json({ message: "Video comment not found" });
        }
        res.status(200).json(updatedVideoComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete video comment by ID
const deleteVideoCommentById = async (req, res) => {
    try {
        const deletedVideoComment = await VideoComment.findByIdAndDelete(req.params.id);
        if (!deletedVideoComment) {
            return res.status(404).json({ message: "Video comment not found" });
        }
        res.status(200).json({ message: "Video comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createVideoComment,
    getAllVideoComments,
    getVideoCommentById,
    getCommentsByVideoId,
    updateVideoCommentById,
    deleteVideoCommentById
};
