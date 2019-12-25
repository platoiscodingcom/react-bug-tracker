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
    },
    author_of_projects: [{ type: Schema.Types.ObjectId, ref: 'Project'}],
});

const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;