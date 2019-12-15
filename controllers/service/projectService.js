const Task = require('../../models/Task')
const Category = require('../../models/Category')
const Project = require('../../models/Project')
setStatus = require('./statusFunctions').setStatus

exports.findAllProjects = async (res) =>{
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

exports.findProjectById = async (projectId, res) =>{
  await Project.findById(projectId)
  .populate('tasks categories files')
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

exports.updateStatus = async (req, res) =>{
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