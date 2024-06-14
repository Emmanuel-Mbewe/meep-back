const mongoose = require('mongoose');

const studentScoreSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  score: {
    type: Number,
    required: true,
    default: 0
  },
  isCompleted: {
    type: Boolean,
    required: true,
    default: false
  }
});

// Export the StudentScore model
module.exports = mongoose.model('StudentScore', studentScoreSchema);
