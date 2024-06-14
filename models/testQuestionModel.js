const  mongoose = require("mongoose")

const testQuestionSchema = new mongoose.Schema({
    question: { type: String },
    answer: { type: String, required: true },
    marks: { type: Number, required: true },
    test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
})

const TestQuestion = mongoose.model("TestQuestion", testQuestionSchema);

module.exports = TestQuestion