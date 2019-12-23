const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: { 
        type: Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    }
});

const User = mongoose.model('users', UserSchema);

module.exports = User;