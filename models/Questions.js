const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  text: { type: String, required: true },
  formId: { type: Schema.Types.ObjectId, required: true, ref: 'Form' },
  courseId: { type: Schema.Types.ObjectId, required: true, ref: 'Course' }
});

// Virtual field to populate answers
questionSchema.virtual('answers', {
  ref: 'Answer',
  localField: '_id',
  foreignField: 'questionId'
});

questionSchema.set('toObject', { virtuals: true });
questionSchema.set('toJSON', { virtuals: true });

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
