const mongoose = require('mongoose');

const ContentCreatorSchema = new mongoose.Schema({
    contact: { type: String},
    image_url: { type: String},
    email: { type: String, required: true  },
    firstname: { type: String },
    lastname: { type: String },
});

const ContentCreator = mongoose.model('ContentCreator', ContentCreatorSchema);

module.exports = ContentCreator;
