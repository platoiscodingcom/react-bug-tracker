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

exports.deleteTaskFromProject = async (data, taskId) => {
  await Project.findById(data.project)
    .then(data => {
      data.tasks.pull(taskId)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.findAllTasks = async (res) =>{
  await Task.find()
  .populate('project')
  .then(data => {
    res.status(200).send(data)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send({ message: 'Error occured: 500' })
  })
}

exports.findTaskById = async (taskId, res) =>{
  await Task.findById(taskId)
    .populate('project')
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.findTaskByProjectId = async (projectId, res) =>{
  await Task.find({ project: projectId })
  .then(data => {
    res.status(200).send(data)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send({ message: 'Error occured: 500' })
  })
}

exports.updateStatus = async (req, res) =>{
  await Task.findById(req.params._id)
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

exports.removeTaskFromAssignee = async (taskId, assigneeId) => {
  await User.findById(assigneeId)
    .then(data => {
      data.assigned_to_tasks.pull(taskId)
      data.save()
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error 500' })
    })
}

exports.removeTaskFromAuthor = async (taskId, authorId) => {
  await User.findById(authorId)
    .then(data => {
      data.author_of_tasks.pull(taskId)
      data.save()
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error 500' })
    })
}