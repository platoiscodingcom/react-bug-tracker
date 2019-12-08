const Project = require('../models/Project')
const Task = require('../models/Task')
const Category = require('../models/Category')
// mongoose = require('mongoose').set('debug', true); //debug
mongoose = require('mongoose')
setStatus = require('./service/statusFunctions').setStatus
projectService = require('./service/projectService')

exports.list = async (req, res) => {
  await Project.find()
    .populate('tasks categories')
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.details = async (req, res) => {
  await Project.findById(req.params._id)
    .populate('tasks categories')
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.create = async (req, res) => {
  const newProject = new Project(req.body)
  newProject._id = new mongoose.Types.ObjectId()
  await newProject
    .save()
    .then(data => {
      projectService.addProjectToCategories(newProject._id, req)
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.update = async (req, res) => {
  // find project by Id
  await Project.findById(req.params._id)
    .then(data => {
      projectService.removeProjectFromAllCategories(data._id, data.categories)

      data.name = req.body.name
      data.status = req.body.status
      data.description = req.body.description
      data.categories = req.body.categories
      data.updatedAt = Date.now()

      projectService.addProjectToCategories(data._id, req.body.categories)

      data.save()
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error: 500' })
    })
}

exports.delete = async (req, res) => {
  await Project.findById(req.params._id)
    .then(data => {
      projectService.deleteAllTasksFromProject(data.tasks)

      projectService.removeProjectFromAllCategories(data._id, data.categories)

      data.remove()
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.statusEvent = async (req, res) => {
  await Project.findById(req.params._id)
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
