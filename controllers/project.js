const Project = require('../models/Project')
const Category = require('../models/Category')
mongoose = require('mongoose').set('debug', true);

exports.list = (req, res) => {
  Project.find()
    .populate('tasks categories')
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.details = (req, res) => {
  Project.findById(req.params._id)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.create = (req, res) => {
  const newProject = new Project({
    _id: new mongoose.Types.ObjectId(),
    description: req.body.description,
    name: req.body.name,
    status: req.body.status
  });
  
  req.body.categories.forEach((cat) =>{ 
    newProject.categories.push(cat);
  })
  req.body.categories.forEach((cat) => {
    console.log('enter loop ...');
    (async () => {
      console.log('async');
      await Category.findById(cat)
      .then(data => {
        console.log(data);
        data.projects.push(newProject._id);
        console.log(data);
        res.status(200).send(data)
      })
    })
  })

  console.log('saving project ...');
  newProject.save()
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.update = (req, res) => {
  Project.findByIdAndUpdate(req.params._id, req.body)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.delete = (req, res) => {
  Project.findByIdAndRemove(req.params._id)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}