const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const Schema = mongoose.Schema

const fileSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  file: { type: Buffer, required: true },
  filename: { type: String, required: true },
  mimetype: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('File', fileSchema)