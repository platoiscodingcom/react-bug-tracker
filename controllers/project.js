const Project = require('../models/Project')
const File = require('../models/File')

mongoose = require('mongoose').set('debug', false)
setStatus = require('./service/statusFunctions').setStatus
projectService = require('./service/projectService')
formidable = require('formidable')
validation = require('./service/validation')
const { validationResult } = require('express-validator')

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
  validation.mongoIdValid(req.params._id)
  await Project.findById(req.params._id)
    .populate('tasks categories files')
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
      projectService.deleteAllTasksFromProject(data.tasks)

      projectService.removeProjectFromAllCategories(data._id, data.categories)

      // remove all related Files

      data.remove()
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.statusEvent = async (req, res) => {
  validation.mongoIdValid(req.params._id)
  await Project.findById(req.params._id)
    .then(data => {
      data.status = setStatus(req.params.event)
      data.updatedAt = Date.now()
      data.save()
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error: 500' })
    })
}

const server = require('../server')
var mv = require('mv')
var fs = require('fs')

exports.upload = (req, res) => {
  let form = new formidable.IncomingForm()
  form.parse(req, (error, fields, files) => {
    const newFile = new File({
      _id: new mongoose.Types.ObjectId(),
      path: `/projects/${req.params._id}/${fields.filename}`,
      filename: fields.filename,
      mimetype: fields.mimetype
    })

    //create public/projects folder if doesn't exist yet
    var projects_dir = server.DIR + '\\projects' 
    if (!fs.existsSync(projects_dir)) {
      fs.mkdirSync(projects_dir)
    }

    //create public/projects/project_id folder if doesn't exist yet
    var dir = server.DIR + '\\projects\\' + req.params._id
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }

    var uploadPath = server.DIR + '\\projects\\' + req.params._id + '\\' + fields.filename

    //move from oldpath(Temp) to newpath(uploadPath)
    mv(files.file.path, uploadPath, function (err) {
      if (err) {
        return res.status(500).send(err)
      }
    })

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
