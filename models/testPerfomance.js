const  mongoose = require("mongoose")

const testPerfomanceSchema = new mongoose.Schema({
    feedback: { type: String, required: true },
    grade: { type: Number, required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
   
})

const TestPerfomance = mongoose.model("TestPerfomance", testPerfomanceSchema);

module.exports = TestPerfomance