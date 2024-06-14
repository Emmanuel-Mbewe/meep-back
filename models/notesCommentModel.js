// notes comment
const mongoose = require('mongoose');

const notesCommentSchema = new mongoose.Schema({
    name: { type: String },
    comment: { type: String },
    subtopic: { type: mongoose.Schema.Types.ObjectId, ref: 'Subtopic', required: true }
});

const NotesComment = mongoose.model('NotesComment', notesCommentSchema);

module.exports = NotesComment;
