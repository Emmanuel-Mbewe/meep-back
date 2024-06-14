const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
    unique: true
  }
});

// Export the Document model
module.exports = mongoose.model('Document', documentSchema);
