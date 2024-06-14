const TestQuestion = require('../models/testQuestionModel');
const Test = require('../models/testModel');
const TestResponse = require('../models/testQuestionResponse');
const Student = require('../models/studentModel');

// Create a new TestQuestion
const createTestQuestion = async (req, res) => {
    try {
        const newTestQuestion = await TestQuestion.create(req.body);
        res.status(201).json(newTestQuestion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all TestQuestions
const getAllTestQuestions = async (req, res) => {
    try {
        const testQuestions = await TestQuestion.find().populate('test');
        res.status(200).json(testQuestions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get TestQuestion by ID
const getTestQuestionById = async (req, res) => {
    try {
        const testQuestion = await TestQuestion.findById(req.params.id).populate('test');
        if (!testQuestion) {
            return res.status(404).json({ error: 'TestQuestion not found' });
        }
        const responses = await TestResponse.find({ testQuestion: req.params.id }).populate('student');
        res.status(200).json({ testQuestion, responses });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update TestQuestion by ID
const updateTestQuestionById = async (req, res) => {
    try {
        const updatedTestQuestion = await TestQuestion.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedTestQuestion) {
            return res.status(404).json({ error: 'TestQuestion not found' });
        }
        res.status(200).json(updatedTestQuestion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete TestQuestion by ID
const deleteTestQuestionById = async (req, res) => {
    try {
        const deletedTestQuestion = await TestQuestion.findByIdAndDelete(req.params.id);
        if (!deletedTestQuestion) {
            return res.status(404).json({ error: 'TestQuestion not found' });
        }
        res.status(200).json(deletedTestQuestion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createTestQuestion,
    getAllTestQuestions,
    getTestQuestionById,
    updateTestQuestionById,
    deleteTestQuestionById,
};
