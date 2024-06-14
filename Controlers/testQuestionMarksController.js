const TestQuestionMarks = require('../models/testQuestionGrade');

// Create a new TestQuestionMarks entry
const createTestQuestionMarks = async (req, res) => {
    try {
        const newTestQuestionMarks = await TestQuestionMarks.create(req.body);
        res.status(201).json(newTestQuestionMarks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all TestQuestionMarks
const getAllTestQuestionMarks = async (req, res) => {
    try {
        const testQuestionMarks = await TestQuestionMarks.find().populate('testQuestion studentResponse');
        res.status(200).json(testQuestionMarks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get TestQuestionMarks by ID
const getTestQuestionMarksById = async (req, res) => {
    try {
        const testQuestionMarks = await TestQuestionMarks.findById(req.params.id).populate('testQuestion studentResponse');
        if (!testQuestionMarks) {
            return res.status(404).json({ error: 'TestQuestionMarks not found' });
        }
        res.status(200).json(testQuestionMarks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update TestQuestionMarks by ID
const updateTestQuestionMarksById = async (req, res) => {
    try {
        const updatedTestQuestionMarks = await TestQuestionMarks.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedTestQuestionMarks) {
            return res.status(404).json({ error: 'TestQuestionMarks not found' });
        }
        res.status(200).json(updatedTestQuestionMarks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete TestQuestionMarks by ID
const deleteTestQuestionMarksById = async (req, res) => {
    try {
        const deletedTestQuestionMarks = await TestQuestionMarks.findByIdAndDelete(req.params.id);
        if (!deletedTestQuestionMarks) {
            return res.status(404).json({ error: 'TestQuestionMarks not found' });
        }
        res.status(200).json(deletedTestQuestionMarks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get student marks for a particular question
const getStudentMarksForQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;
        const marks = await TestQuestionMarks.find({ testQuestion: questionId }).populate('studentResponse');
        if (!marks || marks.length === 0) {
            return res.status(404).json({ error: 'Marks not found for the given question' });
        }
        res.status(200).json(marks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createTestQuestionMarks,
    getAllTestQuestionMarks,
    getTestQuestionMarksById,
    updateTestQuestionMarksById,
    deleteTestQuestionMarksById,
    getStudentMarksForQuestion,
};
