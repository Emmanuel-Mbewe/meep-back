const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: Number, required: true },
    isPremium: { type: Boolean, default: false },
    paymentLink: { type: String },
    isPaidFor: { type: Boolean, default: false },
    banner_url: { type: String },
    topic_img_url: { type: String },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    contentCreator: { type: mongoose.Schema.Types.ObjectId, ref: 'ContentCreator', required: true },
    subtopics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subtopic' }] // Add this line
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
