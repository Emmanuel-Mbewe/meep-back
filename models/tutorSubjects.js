// other tutor subjects Model
const mongoose = require('mongoose');

const tutorSubjectsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutor', required: true },
});

const TutorSubjects = mongoose.model('TutorSubjects', tutorSubjectsSchema);

module.exports = TutorSubjects;
