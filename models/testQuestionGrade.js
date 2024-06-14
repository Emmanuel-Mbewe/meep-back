const  mongoose = require("mongoose")

const testQuestionMarksSchema = new mongoose.Schema({
    student_marks: { type: Number, required: true },
    testQuestion: { type: mongoose.Schema.Types.ObjectId, ref: 'TestQuestion', required: true },
    studentResponse: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentResponse', required: true },


})

const TestQuestionMarks = mongoose.model("TestQuestionMarks", testQuestionMarksSchema);

module.exports = TestQuestionMarks