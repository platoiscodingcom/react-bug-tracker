const Project = require('../models/Project')
const File = require('../models/File')

mongoose = require('mongoose').set('debug', false)
setStatus = require('./service/statusFunctions').setStatus
projectService = require('./service/projectService')
fileService = require('./service/fileService')
localStorageService = require('./service/localStorageService')
formidable = require('formidable')

exports.list = (req, res) => {
  projectService.findAllProjects(req, res)
}

exports.details = (req, res) => {
  projectService.findProjectById(req.params._id, res, req)
}

exports.create = async (req, res) => {
  const newProject = new Project(req.body)
  newProject._id = new mongoose.Types.ObjectId()
  await newProject
    .save()
    .then(data => {
      projectService.addProjectToAssignee(data._id, data.assignedTo._id)
      projectService.addProjectToAuthor(newProject._id, req.body.author)
      projectService.addProjectToCategories(newProject._id, req.body.categories)

      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.update = async (req, res) => {
  await Project.findById(req.params._id).then(data => {
    if (data.assignedTo !== req.body.assignedTo) {
      console.log('req.body.assignedTo: ',req.body.assignedTo )
      console.log('data.assignedTo: ',data.assignedTo )
      //remove from former assignee
      projectService.removeProjectFromAssignee(data._id, data.assignedTo)
      //add to new assignee
      projectService.addProjectToAssignee(data._id, req.body.assignedTo)
    }
  })
  await Project.findByIdAndUpdate(req.params._id, req.body)
    .then(data => {
      projectService.removeProjectFromAllCategories(data._id, data.categories)
      projectService.addProjectToCategories(data._id, req.body.categories)
      data.updatedAt = Date.now()
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
