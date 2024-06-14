const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    stripe_student_id: { type: String},
    username: { type: String, required: true  },
    firstname: { type: String },
    lastname: { type: String },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
