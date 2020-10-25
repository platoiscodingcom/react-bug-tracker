const WorkingTime = require('../models/WorkingTime')
const mongoose = require('mongoose')

exports.createLog = async (req, res) => {
  try {
    const wtime = await WorkingTime.findOne({ documentId: req.params._id })

    var remainingTime = wtime.estimated - req.body.minutes
    var loggedTime = wtime.logged + req.body.minutes

    var newLog = {
      _id: new mongoose.Types.ObjectId(),
      description: req.body.description,
      minutes: req.body.minutes,
      createdAt: Date.now(),
      userId: req.body.userId,
      userName: req.body.userName
    }

    wtime.logs.push(newLog)
    wtime.remaining = remainingTime
    wtime.logged = loggedTime

    wtime.save()

    res.status(200).send({ message: 'New Log Created' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error occured: 500' })
  }
}

exports.getProjectWorkingTime = async (req, res) =>{
  try {
    //todo: ad wt frm all subtasks
    const wtime = await WorkingTime.findOne({ documentId: req.params._id })
    res.status(200).send(wtime)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error occured: 500' })
  }
}

exports.getTaskWorkingTime = async (req, res) =>{
  try {
    const wtime = await WorkingTime.findOne({ documentId: req.params._id })
    res.status(200).send(wtime)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error occured: 500' })
  }
}
