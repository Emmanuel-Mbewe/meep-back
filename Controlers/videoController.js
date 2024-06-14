// controllers/videoController.js
const Video = require('../models/videoModel');
const Subtopic = require('../models/subTopic');
const VideoComment = require('../models/videoCommentsModel'); 

// Create a new video
const createVideo = async (req, res) => {
    try {
        const subtopicId = req.body.subtopic;

        const foundSubtopic = await Subtopic.findById(subtopicId);
        if (!foundSubtopic) {
            return res.status(404).json({ error: 'Subtopic not found' });
        }

        const newVideo = new Video(req.body);
        const savedVideo = await newVideo.save();

        foundSubtopic.videos.push(savedVideo._id);
        await foundSubtopic.save();

        res.status(201).json(savedVideo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all videos
const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find().populate('subtopic');
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get video by ID
const getVideoById = async (req, res) => {
    try {
        const foundVideo = await Video.findById(req.params.id).populate('subtopic');
        if (!foundVideo) {
            return res.status(404).json({ message: "Video not found" });
        }
        res.status(200).json(foundVideo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update video by ID
const updateVideoById = async (req, res) => {
    try {
        const updatedVideo = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVideo) {
            return res.status(404).json({ message: "Video not found" });
        }
        res.status(200).json(updatedVideo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete video by ID
const deleteVideoById = async (req, res) => {
    try {
        const deletedVideo = await Video.findByIdAndDelete(req.params.id);
        if (!deletedVideo) {
            return res.status(404).json({ message: "Video not found" });
        }

        await Subtopic.findByIdAndUpdate(deletedVideo.subtopic, {
            $pull: { videos: deletedVideo._id }
        });

        res.status(200).json({ message: "Video deleted successfully" });
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

module.exports = {
    createVideo,
    getAllVideos,
    getVideoById,
    updateVideoById,
    deleteVideoById,
    getCommentsByVideoId
};