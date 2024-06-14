const mongoose = require('mongoose');

const literacySchema = new mongoose.Schema({
    video_title: { type: String, required: true },
    description: { type: String },
    video_url: { type: String },
    thumbnail_img_url: { type: String },
});

const Literacy = mongoose.model('Literacy', literacySchema);

module.exports = Literacy;
