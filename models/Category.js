const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const categorySchema = new mongoose.Schema({
  name: String,
  project: { type: ObjectId, ref: 'Project' }
})

module.exports = mongoose.model('Category', categorySchema);