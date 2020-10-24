const WorkingTime = require('../models/WorkingTime')
const mongoose = require('mongoose')

exports.createLog = async (req, res) => {
  try {
    //finde workingTime anhand req.params._id
    const wtime = await WorkingTime.findOne({ documentId: req.params.id })
    console.log('wtime', wtime)
    //berechne 'remaining time'
    var remainingTime = wtime.estimated - req.body.time
    //berechne 'logged time'
    var loggedTime = wtime.logged + req.body.time
    //erstelle neues 'logs' element anhand req.body
    var newLog = {
      _id: new mongoose.Types.ObjectId(),
      description: req.body.description,
      minutes: req.body.minutes,
      createdAt: Date.now(),
      userId: req.body.userId,
      userName: userName
    }
    //pushe das logs ins logs array
    wtime.logs.push(newLog)
    //überschreibe remaining und logged mit berechneten daten
    wtime.remaining = remainingTime
    wtime.logged = loggedTime
    //speichere document
    wtime.save()

    res.status(200).send({ message: 'New Log Created' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error occured: 500' })
  }
}
