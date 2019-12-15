const File = require('../models/File')
const Project = require('../models/Project')
mongoose = require('mongoose')
validation = require('./service/validation')
fileService = require('./service/fileService')
formidable = require('formidable')


exports.list = (req, res) => {
  fileService.findAllFiles(res)
}

//delete from Project
exports.delete = (req, res) => {
  fileService.deleteFileFromProject(req.params._id)
  fileService.deleteFileFromDBAndLocally(req.params._id, res)
}
