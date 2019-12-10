const Task = require('../../models/Task')
const Category = require('../../models/Category')
const Project = require('../../models/Project')

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
