const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema ({
  _id: Schema.Types.ObjectId,
  name: String,
  status: String,
  description: String,
  tasks : [{ type: ObjectId, ref: 'Task'}],
  categories: [{type: ObjectId, ref: 'Category'}]
})

module.exports = mongoose.model('Project', projectSchema)