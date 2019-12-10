const Task = require('../models/Task')
mongoose = require('mongoose')
setStatus = require('./service/statusFunctions').setStatus
taskService = require('./service/taskService')
validation = require('./service/validation')
const { validationResult} = require('express-validator')

exports.list = async (req, res) => {
  await Task.find()
    .populate('project')
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.details = async (req, res) => {
  validation.mongoIdValid(req.params._id)

  await Task.findById(req.params._id)
    .populate('project')
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.create = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const newTask = new Task(req.body)
  newTask._id = new mongoose.Types.ObjectId()
  await newTask
    .save()
    .then(data => {
      taskService.saveTaskToProject(req.body.project, newTask)
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.update = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  
  validation.mongoIdValid(req.params._id)
  await Task.findByIdAndUpdate(req.params._id, req.body)
    .then(data => {
      data.updatedAt = Date.now()
      data.save()
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.delete = async (req, res) => {
  validation.mongoIdValid(req.params._id)
  await Task.findById(req.params._id)
    .then(data => {
      taskService.deleteTaskFromProject(data, req.params._id)
      data.remove()
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.tasksByProject = async (req, res) => {
  validation.mongoIdValid(req.params._id)
  await Task.find({ project: req.params._id })
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.statusEvent = async (req, res) => {
  validation.mongoIdValid(req.params._id)
  await Task.findById(req.params._id)
    .then(data => {
      data.status = setStatus(req.params.event)
      if (data.status == null) {
        res.status(404).send(data)
      }
      data.updatedAt = Date.now()
      data.save()
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error: 500' })
    })
}
