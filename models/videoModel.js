// models/videoModel.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    video_url: { type: String },
    title: { type: String },
    isLocked: { type: Boolean, default: false },
    subtopic: { type: mongoose.Schema.Types.ObjectId, ref: 'Subtopic', required: true },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
