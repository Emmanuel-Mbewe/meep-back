const ContentCreator = require('../models/topicContentCreatorModel');
const Topic = require('../models/topicModel');

const createContentCreator = async (req, res) => {
    try {
        const newContentCreator = await ContentCreator.create(req.body);
        res.status(201).json(newContentCreator);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllContentCreators = async (req, res) => {
    try {
        const contentCreators = await ContentCreator.find();
        res.status(200).json(contentCreators);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getContentCreatorById = async (req, res) => {
    try {
        const contentCreator = await ContentCreator.findById(req.params.id);
        if (!contentCreator) {
            return res.status(404).json({ error: 'Content Creator not found' });
        }
        const topics = await Topic.find({ contentCreator: req.params.id });
        res.status(200).json({ contentCreator, topics });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateContentCreatorById = async (req, res) => {
    try {
        const updatedContentCreator = await ContentCreator.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedContentCreator) {
            return res.status(404).json({ error: 'Content Creator not found' });
        }
        res.status(200).json(updatedContentCreator);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteContentCreatorById = async (req, res) => {
    try {
        const deletedContentCreator = await ContentCreator.findByIdAndDelete(req.params.id);
        if (!deletedContentCreator) {
            return res.status(404).json({ error: 'Content Creator not found' });
        }
        res.status(200).json(deletedContentCreator);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createContentCreator,
    getAllContentCreators,
    getContentCreatorById,
    updateContentCreatorById,
    deleteContentCreatorById
};
