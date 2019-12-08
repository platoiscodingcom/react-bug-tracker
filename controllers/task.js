const Task = require('../models/Task')
const Project = require('../models/Project')
mongoose = require('mongoose')
setStatus = require('./service/statusFunctions').setStatus
taskService = require('./service/taskService')

exports.list = (req, res) => {
  Task.find()
    .populate('project')
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.details = (req, res) => {
  Task.findById(req.params._id)
    .populate('project')
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.create = (req, res) => {
  console.log(req.body);
  const newTask = new Task(req.body)
  newTask._id = new mongoose.Types.ObjectId();
  newTask.save()
    .then(data => {
      taskService.saveTaskToProject(req.body.project, newTask);
      res.status(200).send(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.update = (req, res) => {
  Task.findByIdAndUpdate(req.params._id, req.body)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.delete = (req, res) => {
  Task.findById(req.params._id)
    .then(data =>{
      taskService.removeTaskFromProject(data, req);
      data.remove();
      res.status(200).send(data);
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.tasksByProject = (req, res) => {
  Task.find({"project": req.params._id})
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.statusEvent = (req, res) =>{
  Task.findById(req.params._id)
  .then(data =>{
    data.status = setStatus(req.params.event);
    if(data.status == null) {res.status(404).send(data);}
    data.save();
    res.status(200).send(data);
  })
  .catch(error => {
    console.log(error)
    res.status(500).send({ message: 'Error: 500 in TaskController:statusEvent' })
  })
}