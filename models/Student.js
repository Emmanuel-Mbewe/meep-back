// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    set: function(value) {
      // Remove '1*' prefix from password before saving
      const trimmedValue = value.replace(/^1\*/, '');
      return trimmedValue;
    },
  },
});

module.exports = mongoose.model('Student_Ussd', studentSchema);
