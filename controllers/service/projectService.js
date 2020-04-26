const Task = require('../../models/Task')
const Category = require('../../models/Category')
const Project = require('../../models/Project')
const User = require('../../models/User')
setStatus = require('./statusFunctions').setStatus
fileService = require('./fileService')
localStorageService = require('./localStorageService')

exports.addProjectToCategories = (projectId, categories) => {
  categories.forEach(async cat => {
    await Category.findById(cat).then(data => {
      data.projects.push(projectId)
      data.save()
    })
  })
}

exports.addProjectToAssignee = async (projectId, assigneeId) => {
  await User.findById(assigneeId).then(data => {
    data.assigned_to_projects.push(projectId)
    data.markModified('assigned_to_projects');
    data.save()
  })
}

exports.addProjectToAuthor = async (projectId, authorId) => {
  await User.findById(authorId).then(data => {
    data.author_of_projects.push(projectId)
    data.markModified('author_of_projects');
    data.save()
  })
}

exports.removeProjectFromAllCategories = (projectId, categories) => {
  categories.forEach(catId => {
    this.removeProjectFromCategory(projectId, catId)
  })
}

exports.removeProjectFromCategory = async (projectId, catId) => {
  await Category.findById(catId).then(catData => {
    catData.projects.pull(projectId)
    catData.save()
  })
}

exports.removeProjectFromAssignee = async (projectId, assigneeId) => {
  await User.findById(assigneeId).then(data => {
    data.assigned_to_projects.pull(projectId)
    data.markModified('assigned_to_projects');
    data.save()
  })
}

exports.removeProjectFromAuthor = async (projectId, authorId) => {
  await User.findById(authorId).then(data => {
    data.author_of_projects.pull(projectId)
    data.markModified('author_of_projects');
    data.save()
  })
}

//removeProjectFrom all Invited Users

exports.deleteAllTasksFromProject = tasks => {
  tasks.forEach(async task => {
    await Task.findById(task).then(data => {
      data.remove()
    })
  })
}

exports.saveFileToProject = async (id, fileData) => {
  await Project.findById(id).then(data => {
    data.files.push(fileData)
    data.save()
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
