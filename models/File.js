const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fileSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  path: {type: String, required: true},
  filename: { type: String, required: true },
  mimetype: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('File', fileSchema)