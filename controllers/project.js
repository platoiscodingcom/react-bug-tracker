const Project = require('../models/Project')
const User = require('../models/User')
const File = require('../models/File')

mongoose = require('mongoose').set('debug', false)
setStatus = require('./service/statusFunctions').setStatus
projectService = require('./service/projectService')
activityService = require('./service/activityService')
fileService = require('./service/fileService')
localStorageService = require('./service/localStorageService')
workingTimeService = require('./service/workingTimeService')

// @route    GET api/projects
// @desc     Get all pojects
// @access   Private
exports.list = async (req, res) => {
  try {
    const projects = await Project.find({ author: req.user._id }).populate(
      'categories',
      'name'
    )
    .populate(
      'permittedUsers',
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
      _id: req.params._id
    })
      .populate('tasks files')
      .populate('categories', 'name')
      .populate('author', 'name')
      .populate('assignedTo', 'name')
      .populate('permittedUsers', 'name')

    if (!project) {
      console.log('not found')
      return res.status(404).send({ message: 'Project not found' })
    }

    if (project.permittedUsers.forEach(user => user._id != req.user._id)) {
      console.log('no permission')
      return res.status(403).send({ message: 'No Permission' })
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

    projectService.addProjectToAssignee(project._id, project.assignedTo)
    projectService.addProjectToAuthor(project._id, req.body.author)
    projectService.addProjectToCategories(project._id, req.body.categories)

    const author = await User.findById(project.author)
    author.permittedProjects.push(project._id)
    author.markModified('permittedProjects');
    await author.save()

    if(JSON.stringify(project.assignedTo) != JSON.stringify(author._id)){
      const assignee = await User.findById(project.assignedTo)
      assignee.permittedProjects.push(project._id)
      project.permittedUsers.push(project.assignedTo)
      assignee.markModified('permittedProjects');
      await assignee.save()
      project.markModified('permittedUsers');
      await project.save()
    }


    activityService.createActivity(
      project._id,
      project.name,
      'project',
      'create',
      req.body.author
    )

    const estimated = 0

    workingTimeService.create(project._id, estimated)

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
      return res.status(404).send({ message: 'Project not found' })
    }

    activityService.createActivity(
      project._id,
      project.name,
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
        project.name,
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
      project.name,
      'project',
      projectStatus,
      req.params.userId
    )
    res.status(200).send(project)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error: 500' })
  }
}

exports.upload = (req, res) => {
  const newFile = new File({
    _id: new mongoose.Types.ObjectId(),
    path: `/projects/${req.params._id}/${req.body.filename}`,
    filename: req.body.filename,
    mimetype: req.body.mimetype
  })

  console.log('newFile', newFile)
  console.log('req.files.file', req.files.file)
  localStorageService.saveProjectFile(req.params._id, req.files.file, req.body)

  newFile
    .save()
    .then(data => {
      projectService.saveFileToProject(req.params._id, data)
      /*
      activityService.createActivity(
        project._id,
        project.name,
        'project',
        'file_upload',
        req.user._id
      )*/

      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}
