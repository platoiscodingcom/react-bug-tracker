const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const Schema = mongoose.Schema

const projectSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  author: { type: ObjectId, ref: 'User', required: true},
  assignedTo: { type: ObjectId, ref: 'User', required: true},
  permittedUsers: [{ type: ObjectId, ref: 'User', required: true}],
  status: { type: String, required: true },
  description: { type: String, required: true },
  tasks: [{ type: ObjectId, ref: 'Task' }],
  categories: [{ type: ObjectId, ref: 'Category', required: true }],
  files: [{ type: ObjectId, ref: 'File'}],
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  dueDate: Date
})

module.exports = mongoose.model('Project', projectSchema)
