const Task = require('../models/Task')
mongoose = require('mongoose')
setStatus = require('./service/statusFunctions').setStatus
taskService = require('./service/taskService')

// @route    GET api/tasks
// @desc     Get all tasks
// @access   Private
exports.list = async (req, res) => {
  try {
    const tasks = await Task.find().populate('project', 'name')
    res.status(200).send(tasks)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error occured: 500' })
  }
}

// @route    GET api/tasks/:id
// @desc     Get tasks by Id
// @access   Private
exports.details = async (req, res) => {
  try {
    const task = await Task.findById(req.params._id)
      .populate('project', 'name')
      .populate('author', 'name')
      .populate('assignedTo', 'name')

    if (!task) {
      return res.status(404).send({ message: 'Task not found' })
    }
    res.status(200).send(task)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error occured: 500' })
  }
}

// @route    POST api/tasks
// @desc     Create a task
// @access   Private
exports.create = async (req, res) => {
  try {
    const newTask = new Task(req.body)
    newTask._id = new mongoose.Types.ObjectId()
    const task = await newTask.save()

    taskService.addTaskToAssignee(task._id, task.assignedTo)
    taskService.addTaskToAuthor(task._id, req.body.author)

    res.status(200).send(task)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error occured: 500' })
  }
}

// @route    PUT api/tasks/:id
// @desc     Update a task
// @access   Private
exports.update = async (req, res) => {
  try {
    const task = await Task.findById(req.params._id)

    if (!task) {
      return res.status(404).send({ message: 'Task not found' })
    }

    if (task.assignedTo !== req.body.assignedTo) {
      //remove from former assignee
      taskService.removeTaskFromAssignee(task)
      //add to new assignee
      taskService.addTaskToAssignee(task._id, req.body.assignedTo)
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params._id },
      { $set: req.body, updatedAt: Date.now() }
    )

    res.status(200).send(updatedTask)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error occured: 500' })
  }
}

// @route    DELETE api/tasks/:id
// @desc     Delete a task
// @access   Private
exports.delete = async (req, res) => {
  try {
    const task = await Task.findById(req.params._id)
    if (!task) {
      return res.status(404).send({ message: 'Task not found' })
    }
    taskService.removeTaskRelations(task)
    await Task.findOneAndRemove({ _id: req.params._id })

    res.status(200).send({ message: 'User deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error occured: 500' })
  }
}

// @route    PUT api/tasks/:id/:event
// @desc     Change status of a task
// @access   Private
exports.statusEvent = async (req, res) => {
  try {
    const taskStatus = setStatus(req.params.event)
    const task = await Task.findOneAndUpdate(
      { _id: req.params._id },
      { status: taskStatus, updatedAt: Date.now() }
    )
    if (!task) {
      return res.status(404).send({ message: 'Task not found' })
    }
    res.status(200).send(task)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error: 500' })
  }
}
