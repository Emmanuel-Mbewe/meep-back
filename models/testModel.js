const  mongoose = require("mongoose")

const testSchema = new mongoose.Schema({
    name: { type: String },
    topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },

})

const Test = mongoose.model("Test", testSchema);

module.exports = Test