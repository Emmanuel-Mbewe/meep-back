// StudentQuizzes Model
const mongoose = require('mongoose');

const StudentQuizzesSchema = new mongoose.Schema({
    score: { type: String },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true }, 

});

const StudentQuizzes = mongoose.model('StudentQuizzes', StudentQuizzesSchema);

module.exports = StudentQuizzes;
