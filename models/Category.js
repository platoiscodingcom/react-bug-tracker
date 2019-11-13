const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const categorySchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  projects: [{ type: ObjectId, ref: 'Project' }]
})

module.exports = mongoose.model('Category', categorySchema);