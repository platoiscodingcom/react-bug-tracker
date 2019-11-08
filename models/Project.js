const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema ({
  name: String,
  status: String,
  description: String
})

module.exports = mongoose.model('Project', projectSchema)