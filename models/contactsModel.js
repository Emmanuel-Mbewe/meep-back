// other tutor contact Model
const mongoose = require('mongoose');

const contactsSchema = new mongoose.Schema({
    number: { type: Number, required: true },
    tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutor', required: true },
});

const Contacts = mongoose.model('Contacts', contactsSchema);

module.exports = Contacts;
