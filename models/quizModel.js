// models/quizModel.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    allowsMultiple: { type: Boolean, default: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true }
});

const quizSchema = new mongoose.Schema({
    quiz_name: { type: String, required: true },
    description: { type: String },
    questions: [questionSchema], // Use the question schema here
    subtopic: { type: mongoose.Schema.Types.ObjectId, ref: 'Subtopic', required: true }
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;

