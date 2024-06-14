// video comment
const mongoose = require('mongoose');

const videoCommentSchema = new mongoose.Schema({
    name: { type: String },
    comment: { type: String },
    video: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true }
});

const VideoComment = mongoose.model('VideoComment', videoCommentSchema);

module.exports = VideoComment;
