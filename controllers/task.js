const Task = require('../models/Task')
const Project = require('../models/Project')
mongoose = require('mongoose')

exports.list = (req, res) => {
  Task.find()
    .populate('project')
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.details = (req, res) => {
  Task.findById(req.params._id)
    .populate('project')
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.create = (req, res) => {
  console.log(req.body);
  const newTask = new Task(req.body)
  newTask._id = new mongoose.Types.ObjectId();
  newTask.save()
    .then(data => {
      Project.findById(req.body.project)
        .then(projectData => {
          projectData.tasks.push(newTask);
          projectData.save();
        })
        .catch(error => {
          console.log(error)
          res.status(500).send({ message: 'Error occured: 500' })
        })

      res.status(200).send(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.update = (req, res) => {
  Task.findByIdAndUpdate(req.params._id, req.body)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.delete = (req, res) => {
  Task.findById(req.params._id)
    .then(data =>{
      //find project by task.project
      //remove the task from project.tasks 
      Project.findById(data.project)
      .then(data =>{
        const removeIndex = data.tasks.map(item => item._id.toString()).indexOf(req.params._id);
        data.tasks.splice(removeIndex, 1);
        data.save();
      })
      data.remove();
      res.status(200).send(data);
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.tasksByProject = (req, res) => {
  Task.find({"project": req.params._id})
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.close = (req, res) =>{
  Task.findById(req.params._id)
  .then(data =>{
    data.status = CLOSED;
    data.save();
    res.status(200).send(data);
  })
  .catch(error => {
    console.log(error)
    res.status(500).send({ message: 'Error: 500 in taskController:close' })
  })
}

exports.reopen = (req, res) =>{
  Task.findById(req.params._id)
  .then(data =>{
    data.status = REOPENED;
    data.save();
    res.status(200).send(data);
  })
  .catch(error => {
    console.log(error)
    res.status(500).send({ message: 'Error: 500 in taskController:reopen' })
  })
}

exports.open = (req, res) =>{
  Task.findById(req.params._id)
  .then(data =>{
    data.status = OPEN;
    data.save();
    res.status(200).send(data);
  })
  .Task(error => {
    console.log(error)
    res.status(500).send({ message: 'Error: 500 in taskController:open' })
  })
}

exports.start = (req, res) =>{
  Task.findById(req.params._id)
  .then(data =>{
    data.status = INPROGRESS;
    data.save();
    res.status(200).send(data);
  })
  .Task(error => {
    console.log(error)
    res.status(500).send({ message: 'Error: 500 in taskController:start' })
  })
}

exports.stop = (req, res) =>{
  Project.findById(req.params._id)
  .then(data =>{
    data.status = OPEN;
    data.save();
    res.status(200).send(data);
  })
  .catch(error => {
    console.log(error)
    res.status(500).send({ message: 'Error: 500 in taskController:stop' })
  })
}
