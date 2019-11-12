const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const projectSchema = new mongoose.Schema ({
  name: String,
  status: String,
  description: String,
  tasks : [
    {
      task: {
        type: ObjectId,
        ref: 'Task'
      }
    }
  ],
  categories: [
    {
      category: {
        type: ObjectId,
        ref: 'Category'
      }
    }
  ]
})

module.exports = mongoose.model('Project', projectSchema)