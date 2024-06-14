// other tutor comments Model
const mongoose = require('mongoose');

const customerFeedbackSchema = new mongoose.Schema({
    name: { type: String},
    feedback: { type: String},
    tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutor', required: true },
});

const CustomerFeedback = mongoose.model('CustomerFeedback', customerFeedbackSchema);

module.exports = CustomerFeedback;
