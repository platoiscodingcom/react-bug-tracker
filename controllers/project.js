const Project = require('../models/Project')
const File = require('../models/File')

mongoose = require('mongoose').set('debug', false)
setStatus = require('./service/statusFunctions').setStatus
projectService = require('./service/projectService')
activityService = require('./service/activityService')
fileService = require('./service/fileService')
localStorageService = require('./service/localStorageService')
formidable = require('formidable')

// @route    GET api/projects
// @desc     Get all pojects
// @access   Private
exports.list = async (req, res) => {
  try {
    const projects = await Project.find({ author: req.user._id }).populate(
      'categories',
      'name'
    )
    res.status(200).send(projects)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error occured: 500' })
  }
}

// @route    GET api/projects/:id
// @desc     Get projects by Id
// @access   Private
exports.details = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params._id,
      author: req.user._id
    })
      .populate('tasks files')
      .populate('categories', 'name')
      .populate('author', 'name')
      .populate('assignedTo', 'name')

    if (!project) {
      return res.status(404).send({ message: 'Project not found' })
    }

    res.status(200).send(project)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error occured: 500' })
  }
}

// @route    POST api/projects
// @desc     Create a project
// @access   Private
exports.create = async (req, res) => {
  try {
    const newProject = new Project(req.body)
    newProject._id = new mongoose.Types.ObjectId()
    const project = await newProject.save()

    projectService.addProjectToAssignee(project._id, project.assignedTo._id)
    projectService.addProjectToAuthor(project._id, req.body.author)
    projectService.addProjectToCategories(project._id, req.body.categories)

    activityService.createActivity(
      project._id,
      'project',
      'create',
      req.body.author
    )

    res.status(200).send(project)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error occured: 500' })
  }
}

// @route    PUT api/projects/:id
// @desc     Update a project
// @access   Private
exports.update = async (req, res) => {
  try {
    const project = await Project.findById(req.params._id)

    if (!project) {
      return res.status(404).send({ message: 'Task not found' })
    }

    activityService.createActivity(
      project._id,
      'project',
      'update',
      req.user._id
    )

    if (project.assignedTo !== req.body.assignedTo) {
      //remove from former assignee
      projectService.removeProjectFromAssignee(project._id, project.assignedTo)
      //add to new assignee
      projectService.addProjectToAssignee(project._id, req.body.assignedTo)
    }

    const updatedProject = await Project.findOneAndUpdate(
      { _id: req.params._id },
      { $set: req.body, updatedAt: Date.now() }
    )

    projectService.removeProjectFromAllCategories(
      updatedProject._id,
      updatedProject.categories
    )
    projectService.addProjectToCategories(
      updatedProject._id,
      req.body.categories
    )

    res.status(200).send(updatedProject)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error: 500' })
  }
}

// @route    DELETE api/projects/:id
// @desc     Delete a project
// @access   Private
exports.delete = async (req, res) => {
  await Project.findById(req.params._id)
    .then(data => {
      projectService.removeProjectRelations(data, res)
      data.remove()

      activityService.createActivity(
        project._id,
        'project',
        'delete',
        req.user._id
      )

      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

// @route    PUT api/projects/:id/:event
// @desc     Change status of a project
// @access   Private
exports.statusEvent = async (req, res) => {
  try {
    const projectStatus = setStatus(req.params.event)
    const project = await Project.findOneAndUpdate(
      { _id: req.params._id },
      { status: projectStatus, updatedAt: Date.now() }
    )
    if (!project) {
      return res.status(404).send({ message: 'Task not found' })
    }
    activityService.createActivity(
      project._id,
      'project',
      'change_status',
      req.user._id
    )
    res.status(200).send(project)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error: 500' })
  }
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

    if (error) {
      console.log(error)
      return res.status(500).send(error)
    }

    localStorageService.saveProjectFile(req, files, fields)

    newFile
      .save()
      .then(data => {
        projectService.saveFileToProject(req.params._id, data)
        activityService.createActivity(
          project._id,
          'project',
          'file_upload',
          req.user._id
        )

        res.status(200).send(data)
      })
      .catch(error => {
        console.log(error)
        res.status(500).send({ message: 'Error occured: 500' })
      })
  })
}
