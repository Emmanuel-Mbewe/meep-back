const StudentQuizzes = require('../models/studentQuizzesModel');
const Student = require('../models/studentModel');
const Quiz = require('../models/quizModel');

// Create a new StudentQuiz
const createStudentQuiz = async (req, res) => {
    try {
        const newStudentQuiz = await StudentQuizzes.create(req.body);
        res.status(201).json(newStudentQuiz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all StudentQuizzes
const getAllStudentQuizzes = async (req, res) => {
    try {
        const studentQuizzes = await StudentQuizzes.find().populate('student').populate('quiz');
        res.status(200).json(studentQuizzes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get StudentQuiz by ID
const getStudentQuizById = async (req, res) => {
    try {
        const studentQuiz = await StudentQuizzes.findById(req.params.id).populate('student').populate('quiz');
        if (!studentQuiz) {
            return res.status(404).json({ error: 'StudentQuiz not found' });
        }
        res.status(200).json(studentQuiz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update StudentQuiz by ID
const updateStudentQuizById = async (req, res) => {
    try {
        const updatedStudentQuiz = await StudentQuizzes.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedStudentQuiz) {
            return res.status(404).json({ error: 'StudentQuiz not found' });
        }
        res.status(200).json(updatedStudentQuiz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete StudentQuiz by ID
const deleteStudentQuizById = async (req, res) => {
    try {
        const deletedStudentQuiz = await StudentQuizzes.findByIdAndDelete(req.params.id);
        if (!deletedStudentQuiz) {
            return res.status(404).json({ error: 'StudentQuiz not found' });
        }
        res.status(200).json(deletedStudentQuiz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all StudentQuizzes done by a particular student
const getAllQuizzesByStudent = async (req, res) => {
    try {
        const studentQuizzes = await StudentQuizzes.find({ student: req.params.studentId }).populate('quiz');
        res.status(200).json(studentQuizzes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all StudentQuizzes done by a particular student for a specific quiz
const getQuizzesByStudentAndQuiz = async (req, res) => {
    try {
        const studentQuizzes = await StudentQuizzes.find({ student: req.params.studentId, quiz: req.params.quizId }).populate('quiz');
        res.status(200).json(studentQuizzes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createStudentQuiz,
    getAllStudentQuizzes,
    getStudentQuizById,
    updateStudentQuizById,
    deleteStudentQuizById,
    getAllQuizzesByStudent,
    getQuizzesByStudentAndQuiz,
};
