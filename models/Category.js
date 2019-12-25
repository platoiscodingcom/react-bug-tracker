const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const categorySchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  projects: [{ type: ObjectId, ref: 'Project'}],
  author: { type: ObjectId, ref: 'User'},
})

module.exports = mongoose.model('Category', categorySchema);