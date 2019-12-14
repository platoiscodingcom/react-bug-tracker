const File = require('../models/File')
const Project = require('../models/Project')
mongoose = require('mongoose')
validation = require('./service/validation')
//fileService = require('./service/fileService')
formidable = require('formidable')
fs = require('fs')

exports.list = async (req, res) => {
  await File.find()
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

const server = require('../server')
//deleteFromProject
exports.delete = async (req, res) => {
  await Project.findOne({ files: req.params._id })
    .then(data => {
      data.files.pull(req.params._id)
      data.save()
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })

  await File.findById(req.params._id)
    .then(data => {
      fs.unlink(server.DIR + data.path, err => {
        if (err) {
          console.log(err)
          res.status(500).send({ message: 'Error occured: 500' })
        }
      })
      data.remove()
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}
