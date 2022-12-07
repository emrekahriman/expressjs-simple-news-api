const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});


module.exports = mongoose.model('User', UserSchema);