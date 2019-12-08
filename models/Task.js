const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  project: { type: ObjectId, ref: 'Project' },
  description: String,
  priority: String,
  status: String,
  type: String,
  createdAt: { type : Date, default: Date.now },
  updatedAt: Date
})


module.exports = mongoose.model('Task', taskSchema)