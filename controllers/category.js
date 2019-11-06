const Category = require('../models/Category')

exports.list = (req, res) => {
  Category.find()
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({msg: "Error 500 in categorycontroller.list"})
    })
}

exports.details = (req, res) => {
  Category.findById(req.params._id)
    .then(data =>{
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({msg: "Error 500 in categorycontroller.details"})
    })
}

exports.create = (req, res) => {
  const newCategory = new Category(req.body)
  newCategory.save()
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ msg: "Error 500 in categorycontroller.create" })
    })
}

exports.update = (req, res) => {
  Category.findByIdAndUpdate(req.params._id, req.body)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({msg: "Error 500 in categorycontroller.update"})
    })
}

exports.delete = (req, res) => {
  Category.findByIdAndRemove(req.params._id)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ msg: "Error 500 in categorycontroller.delete" })
    })
}