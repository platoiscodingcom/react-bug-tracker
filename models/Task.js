const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  title: { type: String, required: true },
  project: { type: ObjectId, ref: 'Project' ,required: true},
  description: { type: String, required: true },
  priority: { type: String, required: true },
  status: { type: String, required: true },
  type: { type: String, required: true },
  createdAt: { type : Date, default: Date.now },
  updatedAt: Date
})


module.exports = mongoose.model('Task', taskSchema)