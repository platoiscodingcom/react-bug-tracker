const Task = require('../../models/Task')
const User = require('../../models/User')
const Project = require('../../models/Project')
setStatus = require('./statusFunctions').setStatus

exports.saveTaskToProject = async (project, task) => {
  await Project.findById(project)
    .then(projectData => {
      projectData.tasks.push(task)
      projectData.save()
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.deleteTaskFromProject = async (task) => {
  await Project.findById(task.project)
    .then(data => {
      data.tasks.pull(task._id)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}


exports.addTaskToAuthor = async (taskId, authorId) =>{
  await User.findById(authorId)
  .then(data => {
    data.author_of_tasks.push(taskId)
    data.save()
  })
  .catch(error => {
    console.log(error)
    res.status(500).send({ message: 'Error 500' })
  })
}

exports.addTaskToAssignee = async (taskId, assigneeId) => {
  await User.findById(assigneeId)
    .then(data => {
      data.assigned_to_tasks.push(taskId)
      data.save()
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error 500' })
    })
}

exports.removeTaskFromAssignee = async (task) => {
  await User.findById(task.assignedTo)
    .then(data => {
      data.assigned_to_tasks.pull(task._id)
      data.save()
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error 500' })
    })
}

exports.removeTaskFromAuthor = async (task) => {
  await User.findById(task.author)
    .then(data => {
      data.author_of_tasks.pull(task._id)
      data.save()
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error 500' })
    })
}

exports.removeTaskRelations = (data) => {
  this.deleteTaskFromProject(data)
  this.removeTaskFromAuthor(data)
  this.removeTaskFromAssignee(data)
}