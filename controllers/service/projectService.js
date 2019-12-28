const Task = require('../../models/Task')
const Category = require('../../models/Category')
const Project = require('../../models/Project')
const User = require('../../models/User')
setStatus = require('./statusFunctions').setStatus
fileService = require('./fileService')
localStorageService = require('./localStorageService')

exports.findAllProjects = async (req, res) => {
  await Project.find({author: req.user._id})
    .populate('categories')
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.findProjectById = async (projectId, res, req) => {
  await Project.findOne({_id: projectId, author: req.user._id})
    .populate('tasks categories author assignedTo files')
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.addProjectToCategories = (projectId, categories) => {
  categories.forEach(async cat => {
    await Category.findById(cat)
      .then(data => {
        data.projects.push(projectId)
        data.save()
      })
      .catch(error => {
        console.log(error)
        res.status(500).send({ message: 'Error 500' })
      })
  })
}

exports.addProjectToAssignee = async (projectId, assigneeId) => {
  await User.findById(assigneeId)
    .then(data => {
      data.assigned_to_projects.push(projectId)
      data.save()
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error 500' })
    })
}

exports.addProjectToAuthor = async (projectId, authorId) => {
  await User.findById(authorId)
    .then(data => {
      data.author_of_projects.push(projectId)
      data.save()
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error 500' })
    })
}

exports.removeProjectFromAllCategories = (projectId, categories) => {
  categories.forEach(async cat => {
    await Category.findById(cat)
      .then(catData => {
        catData.projects.pull(projectId)
        catData.save()
      })
      .catch(error => {
        console.log(error)
        res.status(500).send({
          message: 'Error 500'
        })
      })
  })
}

exports.removeProjectFromAssignee = async (projectId, assigneeId) => {
  await User.findById(assigneeId)
    .then(data => {
      data.assigned_to_projects.pull(projectId)
      data.save()
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error 500' })
    })
}

exports.removeProjectFromAuthor = async (projectId, authorId) => {
  await User.findById(authorId)
    .then(data => {
      data.author_of_projects.pull(projectId)
      data.save()
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error 500' })
    })
}

//removeProjectFrom all Invited Users

exports.deleteAllTasksFromProject = tasks => {
  tasks.forEach(async task => {
    await Task.findById(task)
      .then(data => {
        data.remove()
      })
      .catch(error => {
        console.log(error)
      })
  })
}

exports.saveFileToProject = async (id, fileData) => {
  await Project.findById(id)
    .then(data => {
      data.files.push(fileData)
      data.save()
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error: 500' })
    })
}

exports.updateStatus = async (req, res) => {
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

exports.removeProjectRelations = (data, res) => {
  //remove project from all users who are invited

  this.removeProjectFromAssignee(data._id, data.assignedTo)

  this.removeProjectFromAuthor(data._id, data.author)

  this.deleteAllTasksFromProject(data.tasks)

  this.removeProjectFromAllCategories(data._id, data.categories)

  fileService.deleteAllFilesFromProject(data.files, res)

  //remove local client/public/projects/project_id folder
  localStorageService.removeLocalProjectIdFolder(data._id)
}
