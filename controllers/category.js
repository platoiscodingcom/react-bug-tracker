const Category = require('../models/Category')
mongoose = require('mongoose')
categoryService = require('./service/categoryService')

// @route    GET api/categories
// @desc     get all categories
// @access   Private
exports.list = async (req, res) => {
  try {
    const categores = await Category.find()
    res.status(200).send(categores)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error 500' })
  }
}

// @route    GET api/categories/:id
// @desc     get a category by Id
// @access   Private
exports.details = async (req, res) => {
  try {
    const category = await Category.findById(req.params._id).populate('projects')
    if (!category) {
      return res.status(404).send({ message: 'Category not found' })
    }
    res.status(200).send(category)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error 500' })
  }
}

// @route    POST api/category
// @desc     create new Category
// @access   Private
exports.create = async (req, res) => {
  try {
    const newCategory = new Category(req.body)
    newCategory._id = new mongoose.Types.ObjectId()
    const category = await newCategory.save()
    res.status(200).send(category)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error 500' })
  }
}

// @route    PUT api/categories/:id/
// @desc     Update a category
// @access   Private
exports.update = async (req, res) => {
  await Category.findByIdAndUpdate(req.params._id, req.body)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error 500' })
    })
}

// @route    DELETE api/categories/:id/
// @desc     delete a category 
// @access   Private
exports.delete = async (req, res) =>{
  try {
    const category = await Category.findById(req.params._id)
    if (!category) {
      return res.status(404).send({ message: 'Task not found' })
    }

    //removeCategoryFromAllProjects
    category.projects.forEach(project => {
      categoryService.removeCategoryFromProject(project._id, req.params._id)
    })

    await Category.findOneAndRemove({ _id: req.params._id })
    res.status(200).send({ message: 'Category deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error occured: 500' })
  }
}

