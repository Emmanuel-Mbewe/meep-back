// models/Content.js
const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  topic: { type: String, required: true },
  sub_topic: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String, required: true },
  video: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);
