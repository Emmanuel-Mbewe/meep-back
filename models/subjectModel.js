// Subject Model
const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image_url: { type: String, required: false},
    description : { type: String, required: false },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: false }, // Reference to Class model
    creator_name: { type: String, required: false }
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
