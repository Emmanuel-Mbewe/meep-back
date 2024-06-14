const Topic = require('../models/topicModel');
const Subject = require('../models/subjectModel');
const Class = require('../models/classModel');
const Subtopic = require('../models/subTopic');

// Create a new topic
const createTopic = async (req, res) => {
    try {
        const subjectId = req.body.subjectId || req.params.subjectId;

        if (!subjectId) {
            return res.status(400).json({ error: 'Subject ID is required' });
        }

        const foundSubject = await Subject.findById(subjectId);
        if (!foundSubject) {
            return res.status(404).json({ error: 'Subject not found' });
        }

        const newTopic = await Topic.create({ ...req.body, subject: subjectId });
        console.log("Topic created:", newTopic);
        res.status(201).json(newTopic);
    } catch (error) {
        console.error("Error creating topic:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get all topics
const getAllTopics = async (req, res) => {
    try {
        const topics = await Topic.find().populate('subject').populate('class');
        console.log("Fetched all topics:", topics);
        res.status(200).json(topics);
    } catch (error) {
        console.error("Error fetching topics:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get topic by ID
const getTopicById = async (req, res) => {
    try {
        const foundTopic = await Topic.findById(req.params.id)
            .populate('subject')
            .populate('class');

        if (!foundTopic) {
            console.log("Topic not found:", req.params.id);
            return res.status(404).json({ message: "Topic not found" });
        }

        // Populate subtopics
        const subtopics = await Subtopic.find({ topic: foundTopic._id });

        console.log("Fetched topic by ID with subtopics:", foundTopic, subtopics);
        res.status(200).json({ ...foundTopic.toObject(), subtopics });
    } catch (error) {
        console.error("Error fetching topic by ID:", error);
        res.status(500).json({ error: error.message });
    }
};

// Update topic by ID
const updateTopicById = async (req, res) => {
    try {
        const updatedTopic = await Topic.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTopic) {
            console.log("Topic not found for update:", req.params.id);
            return res.status(404).json({ message: "Topic not found" });
        }

        console.log("Updated topic by ID:", updatedTopic);
        res.status(200).json(updatedTopic);
    } catch (error) {
        console.error("Error updating topic by ID:", error);
        res.status(500).json({ error: error.message });
    }
};

// Delete topic by ID
const deleteTopicById = async (req, res) => {
    try {
        const deletedTopic = await Topic.findByIdAndDelete(req.params.id);
        if (!deletedTopic) {
            console.log("Topic not found for deletion:", req.params.id);
            return res.status(404).json({ message: "Topic not found" });
        }

        console.log("Deleted topic by ID:", req.params.id);
        res.status(200).json({ message: "Topic deleted successfully" });
    } catch (error) {
        console.error("Error deleting topic by ID:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createTopic,
    getAllTopics,
    getTopicById,
    updateTopicById,
    deleteTopicById
};
