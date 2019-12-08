const Category = require('../models/Category')
const Project = require('../models/Project')
mongoose = require('mongoose')
categoryService = require('./service/categoryService')

exports.list = (req, res) => {
  Category.find()
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({msg: "Error 500"})
    })
}

exports.details = (req, res) => {
  Category.findById(req.params._id)
    .then(data =>{
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({msg: "Error 500"})
    })
}

exports.create = (req, res) => {
  const newCategory = new Category(req.body);
  newCategory._id = new mongoose.Types.ObjectId();
  newCategory.save()
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ msg: "Error 500" })
    })
}

exports.update = (req, res) => {
  Category.findByIdAndUpdate(req.params._id, req.body)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({msg: "Error 500"})
    })
}

exports.delete = (req, res) => {
  //delete ref to this category from all related projects

  Category.findById(req.params._id)
  .then(data =>{
    categoryService.removeCategoryFromAllProjects(data, req)
    res.status(200).send(data);
  })
  .catch(error => {
    console.log(error)
    res.status(500).send({ msg: "Error 500" })
  })
}