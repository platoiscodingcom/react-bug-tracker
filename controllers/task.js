const Task = require('../models/Task')
mongoose = require('mongoose')
setStatus = require('./service/statusFunctions').setStatus
taskService = require('./service/taskService')

exports.list = async (req, res) => {
  await Task.find()
    .populate('project', 'name')
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.details = async (req, res) => {
  await Task.findById(req.params._id)
    .populate('project', 'name')
    .populate('author', 'name')
    .populate('assignedTo', 'name')
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.create = async (req, res) => {
  const newTask = new Task(req.body)
  newTask._id = new mongoose.Types.ObjectId()
  await newTask
    .save()
    .then(data => {
      console.log('create task: assignedToID:',  data.assignedTo)
      taskService.addTaskToAssignee(data._id, data.assignedTo)
      taskService.addTaskToAuthor(newTask._id, req.body.author)
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.update = async (req, res) => {
  await Task.findById(req.params._id).then(data => {
    if (data.assignedTo !== req.body.assignedTo) {
      //remove from former assignee
      taskService.removeTaskFromAssignee(data)
      //add to new assignee
      taskService.addTaskToAssignee(data._id, req.body.assignedTo)
    }
  })
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
  await Task.findById(req.params._id)
    .then(data => {
      taskService.removeTaskRelations(data)
      data.remove()
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.tasksByProject = async (req, res) => {
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
