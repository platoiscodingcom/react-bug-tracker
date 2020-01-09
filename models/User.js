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
    assigned_to_projects: [{ type: Schema.Types.ObjectId, ref: 'Project'}],
    author_of_tasks: [{ type: Schema.Types.ObjectId, ref: 'Task'}],
    assigned_to_tasks: [{ type: Schema.Types.ObjectId, ref: 'Task'}],
});

const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;