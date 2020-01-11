const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const Schema = mongoose.Schema

const activitySchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  action: { type: String, required: true },
  documentType: { type: String, required: true },
  user: { type: ObjectId, ref: 'User', required: true },
  documentId: { type: ObjectId, required: true },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Activity', activitySchema)
