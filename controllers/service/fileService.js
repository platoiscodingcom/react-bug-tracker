const File = require('../../models/File')
const Project = require('../../models/Project')
mongoose = require('mongoose')

localStorageService = require('./localStorageService')

//deletes File from ProjectDB
exports.deleteFileFromProject = async (fileId) =>{
  await Project.findOne({ files: fileId })
    .then(data => {
      data.files.pull(fileId)
      data.save()
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.deleteFileFromDBAndLocally = async (fileId, res) =>{
  await File.findById(fileId)
  .then(data => {
    localStorageService.deleteFileLocally(data)

    data.remove()
    res.status(200).send(data)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send({ message: 'Error occured: 500' })
  })
}

exports.deleteAllFilesFromProject = (files, res) =>{
  files.forEach(async file =>{
    await File.findById(file._id)
      .then(data =>{
        localStorageService.deleteFileLocally(data)

        data.remove()
      })
      .catch(error => {
        console.log(error)
        res.status(500).send({ message: 'Error occured: 500' })
      })
  })
}

exports.findAllFiles = async (res) =>{
  await File.find()
  .then(data => {
    res.status(200).send(data)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send({ message: 'Error occured: 500' })
  })
}