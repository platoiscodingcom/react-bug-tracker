const Task = require('../models/Task')
mongoose = require('mongoose')
setStatus = require('./service/statusFunctions').setStatus
taskService = require('./service/taskService')

exports.list = (req, res) => {
  taskService.findAllTasks(res)
}

exports.details = (req, res) => {
  taskService.findTaskById(req.params._id, res)
}

exports.create = async (req, res) => {
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
      taskService.deleteTaskFromProject(data, req.params._id)
      data.remove()
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.tasksByProject = (req, res) => {
  taskService.findTaskByProjectId(req.params._id, res)
}

exports.statusEvent = (req, res) => {
  taskService.updateStatus(req, res)
}
