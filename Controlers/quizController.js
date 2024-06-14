const Quiz = require('../models/quizModel');
const Subtopic = require('../models/subTopic');

// Create a new quiz
const createQuiz = async (req, res) => {
    try {
        const subtopicId = req.body.subtopic;

        const foundSubtopic = await Subtopic.findById(subtopicId);
        if (!foundSubtopic) {
            return res.status(404).json({ error: 'Subtopic not found' });
        }

        const newQuiz = new Quiz(req.body);
        const savedQuiz = await newQuiz.save();

        foundSubtopic.quizzes.push(savedQuiz._id);
        await foundSubtopic.save();

        res.status(201).json(savedQuiz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all quizzes
const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate('subtopic');
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get quiz by ID
const getQuizById = async (req, res) => {
    try {
        const foundQuiz = await Quiz.findById(req.params.id).populate('subtopic');
        if (!foundQuiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        res.status(200).json(foundQuiz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update quiz by ID
const updateQuizById = async (req, res) => {
    try {
        const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedQuiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        res.status(200).json(updatedQuiz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete quiz by ID
const deleteQuizById = async (req, res) => {
    try {
        const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!deletedQuiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        await Subtopic.findByIdAndUpdate(deletedQuiz.subtopic, {
            $pull: { quizzes: deletedQuiz._id }
        });

        res.status(200).json({ message: "Quiz deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createQuiz,
    getAllQuizzes,
    getQuizById,
    updateQuizById,
    deleteQuizById
};
