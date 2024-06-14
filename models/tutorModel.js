// tutor Model
const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image_url: { type: String },
    experience : { type: String },
    location : { type: String },
    masteredSubject : { type: String },
    facebookLink : { type: String },
    gmailLink : { type: String },
    whatsappLink : { type: String },

    linkedInProfileLink : { type: String },
});

const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;
