const Test = require('../models/testModel');
const TestQuestion = require('../models/testQuestionModel');

// Create a new Test
const createTest = async (req, res) => {
    try {
        const newTest = await Test.create(req.body);
        res.status(201).json(newTest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all Tests
const getAllTests = async (req, res) => {
    try {
        const tests = await Test.find().populate('topic');
        res.status(200).json(tests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Test by ID
const getTestById = async (req, res) => {
    try {
        const test = await Test.findById(req.params.id).populate('topic');
        if (!test) {
            return res.status(404).json({ error: 'Test not found' });
        }
        const questions = await TestQuestion.find({ test: req.params.id });
        res.status(200).json({ test, questions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Test by ID
const updateTestById = async (req, res) => {
    try {
        const updatedTest = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedTest) {
            return res.status(404).json({ error: 'Test not found' });
        }
        res.status(200).json(updatedTest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Test by ID
const deleteTestById = async (req, res) => {
    try {
        const deletedTest = await Test.findByIdAndDelete(req.params.id);
        if (!deletedTest) {
            return res.status(404).json({ error: 'Test not found' });
        }
        res.status(200).json(deletedTest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createTest,
    getAllTests,
    getTestById,
    updateTestById,
    deleteTestById,
};
