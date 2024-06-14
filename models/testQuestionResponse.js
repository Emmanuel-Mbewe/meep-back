const  mongoose = require("mongoose")

const testResponseSchema = new mongoose.Schema({
    student_response: { type: String },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    testQuestion: { type: mongoose.Schema.Types.ObjectId, ref: 'TestQuestion', required: true },
})

const StudentResponse = mongoose.model("StudentResponse", testResponseSchema);

module.exports = StudentResponse