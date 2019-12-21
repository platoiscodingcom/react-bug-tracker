const Category = require('../models/Category')
mongoose = require('mongoose')
categoryService = require('./service/categoryService')

exports.list = (req, res) => {
  categoryService.findAllCategories(res)
}

exports.details = (req, res) => {
  categoryService.findCategoryById(req.params._id, res)
}

exports.create = async (req, res) => {
  const newCategory = new Category(req.body)
  newCategory._id = new mongoose.Types.ObjectId()
  await newCategory
    .save()
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ msg: 'Error 500' })
    })
}

exports.update = async (req, res) => {
  await Category.findByIdAndUpdate(req.params._id, req.body)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ msg: 'Error 500' })
    })
}

exports.delete = async (req, res) => {
  await Category.findById(req.params._id)
    .then(data => {
      categoryService.removeCategoryFromAllProjects(
        data.projects,
        req.params._id
      )
      data.remove()
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ msg: 'Error 500' })
    })
}
