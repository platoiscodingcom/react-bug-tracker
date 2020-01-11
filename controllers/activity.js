const Acitivty = require('../models/Activity')
mongoose = require('mongoose')
activityService = require('./service/activityService')

// @route    GET api/activity
// @desc     get all activity entries
// @access   Private
exports.list = async (req, res) => {
  try {
    const activities = await Acitivty.find()
    res.status(200).send(activities)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error 500' })
  }
}

// @route    GET api/activity/project/:projectId
// @desc     get all activity entries by projectId
// @access   Private
exports.activityByProject = async (req, res) => {
  try {
    const activities = await Acitivty.find({
      documentId: req.params._id,
      docmentTye: 'project'
    })
    res.status(200).send(activities)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error 500' })
  }
}

// @route    GET api/activity/task/:tasktId
// @desc     get all activity entries by tasktId
// @access   Private
exports.activityByTask = async (req, res) => {
  try {
    const activities = await Acitivty.find({
      documentId: req.params._id,
      docmentTye: 'task'
    })
    res.status(200).send(activities)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error 500' })
  }
}

// @route    GET api/activity/user/:userId
// @desc     get all activity entries by userId
// @access   Private
exports.activityByUser = async (req, res) => {
  try {
    const activities = await Acitivty.find({
      user: req.params._id,
    })
    res.status(200).send(activities)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error 500' })
  }
}

// @route    POST api/activity
// @desc     create new Activity
// @access   Private
exports.create = async (req, res) => {
  try {
    const newActvity = new Acitivty(req.body)
    newActvity._id = new mongoose.Types.ObjectId()
    const activity = await newActvity.save()
    res.status(200).send(activity)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error 500' })
  }
}
