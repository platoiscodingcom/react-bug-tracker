const Task = require('../models/Task')
const Project = require('../models/Project')
mongoose = require('mongoose')

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
  const newTask = new Task(req.body)
  newTask._id = new mongoose.Types.ObjectId();
  newTask.save()
    .then(data => {
      Project.findById(req.body.project)
        .then(projectData => {
          projectData.tasks.push(newTask);
          projectData.save();
        })
        .catch(error => {
          console.log(error)
          res.status(500).send({ message: 'Error occured: 500' })
        })

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
  Task.findByIdAndRemove(req.params._id)
    .then(data => {
      res.status(200).send(data)
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
