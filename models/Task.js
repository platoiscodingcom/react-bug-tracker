const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const taskSchema = new mongoose.Schema({
  title: String,
  project: { type: ObjectId, ref: 'Project' },
  description: String,
  priority: String,
  status: String
})


module.exports = mongoose.model('Task', taskSchema)