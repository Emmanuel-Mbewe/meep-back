const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
  questionId: { type: Schema.Types.ObjectId, required: true, ref: 'Question' }
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
