// routes/notesRoutes.js
const express = require('express');
const { createStudentQuiz, getAllStudentQuizzes, getStudentQuizById, getQuizzesByStudentAndQuiz,
    updateStudentQuizById, deleteStudentQuizById, getAllQuizzesByStudent} = require('../Controlers/studentQuizzesController');

const router = express.Router();

router.post('/', createStudentQuiz);
router.get('/', getAllStudentQuizzes);
router.get('/:id', getStudentQuizById);
router.get('/student/:studentId', getAllQuizzesByStudent);
router.get('/student/quizzes/:studentId/:quizId', getQuizzesByStudentAndQuiz);
router.put('/:id', updateStudentQuizById);
router.delete('/:id', deleteStudentQuizById);

module.exports = router;
