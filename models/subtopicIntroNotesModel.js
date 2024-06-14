const mongoose = require('mongoose');

const subtopicIntroNotesSchema = new mongoose.Schema({
    paragraph1: { type: String },
    paragraph2: { type: String },
    paragraph3: { type: String },
    paragraph4: { type: String },
    subtopic: { type: mongoose.Schema.Types.ObjectId, ref: 'Subtopic', required: true }
});

const SubtopicIntroNotes = mongoose.model('SubtopicIntroNotes', subtopicIntroNotesSchema);

module.exports = SubtopicIntroNotes;
