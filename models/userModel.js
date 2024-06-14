const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["user", "admin", "teacher"],
        default: "user",
    },
    photo: { type: String } // Assuming you'll store the photo URL
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
