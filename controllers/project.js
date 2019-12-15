const Project = require('../models/Project')
const File = require('../models/File')

mongoose = require('mongoose').set('debug', false)
setStatus = require('./service/statusFunctions').setStatus
projectService = require('./service/projectService')
fileService = require('./service/fileService')
localStorageService = require('./service/localStorageService')
formidable = require('formidable')
validation = require('./service/validation')
const { validationResult } = require('express-validator')

exports.list = (req, res) => {
  projectService.findAllProjects(res)
}

exports.details = (req, res) => {
  validation.mongoIdValid(req.params._id)
  projectService.findProjectById(req.params._id, res)
}

exports.create = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const newProject = new Project(req.body)
  newProject._id = new mongoose.Types.ObjectId()
  await newProject
    .save()
    .then(data => {
      projectService.addProjectToCategories(newProject._id, req.body.categories)
      
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
  await Project.findById(req.params._id)
    .then(data => {
      projectService.removeProjectFromAllCategories(data._id, data.categories)

      data.name = req.body.name
      data.status = req.body.status
      data.description = req.body.description
      data.categories = req.body.categories
      data.files = req.body.files
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
  validation.mongoIdValid(req.params._id)
  await Project.findById(req.params._id)
    .then(data => {
      
      //delete all projectTasks and -Files
      //remove Project from Categories
      projectService.removeProjectRelations(data, res)

      data.remove()
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.statusEvent = (req, res) => {
  validation.mongoIdValid(req.params._id)
  projectService.updateStatus(req, res)
  
}

exports.upload = (req, res) => {
  let form = new formidable.IncomingForm()
  form.parse(req, (error, fields, files) => {
    const newFile = new File({
      _id: new mongoose.Types.ObjectId(),
      path: `/projects/${req.params._id}/${fields.filename}`,
      filename: fields.filename,
      mimetype: fields.mimetype
    })

    if (error) return res.status(500).send(error)

    localStorageService.saveProjectFile(req, files, fields)

    newFile
      .save()
      .then(data => {
        projectService.saveFileToProject(req.params._id, data)
        res.status(200).send(data)
      })
      .catch(error => {
        console.log(error)
        res.status(500).send({ message: 'Error occured: 500' })
      })
  })
}
