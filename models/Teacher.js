const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  teachingSubject: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  serialNumber: {
    type: String,
    default: null // It can be optional depending on your requirements
  },
  status: {
    type: String,
    default: null // It can be optional depending on your requirements
  }
});

// Export the Teacher model
module.exports = mongoose.model('Teacher', teacherSchema);
