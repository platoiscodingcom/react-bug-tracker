
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    _userId: { 
        type: Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    token: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        required: true, 
        default: Date.now, 
        expires: 43200 
    }
});
const Token = mongoose.model('tokens', TokenSchema);


module.exports = Token;