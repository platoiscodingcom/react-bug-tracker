const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const workingTimeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  documentId:  { type: ObjectId, required: true },
  estimated: { type: Number },
  remaining: { type: Number },
  logged: { type: Number },
  logs: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      description: { type: String, required: true },
      minutes: { type: Number, required: true },
      createdAt: { type: Date, required:true },
      userId: { type: ObjectId, required: true },
      userName: { type: String, required: true }
    }
  ]
})


module.exports = mongoose.model('WorkingTime', workingTimeSchema)
