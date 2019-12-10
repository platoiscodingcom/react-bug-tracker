const File = require('../models/File')
mongoose = require('mongoose')
validation = require('./service/validation')
fileService = require('./service/fileService')
formidable = require('formidable')
const { validationResult } = require('express-validator')

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

// upload: make ref in project or task
exports.upload = async (req, res) => {
  /*
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log('err', errors)
    return res.status(400).json({ errors: errors.array() })
  } */

  let form = new formidable.IncomingForm()

  form.parse(req, (err, fields, files) => {
    // you can get the file from files.file.path
    console.log('files.file.path', files.file.path)
    // contains 'filename' and 'mimetype'
    console.log('fields', fields)
    const newFile = new File({
      _id: new mongoose.Types.ObjectId(),
      file: files.file.path,
      filename: fields.filename,
      mimetype: fields.mimetype
    })

    newFile
      .save()
      .then(data => {
        console.log('needs to make ref in project')
        res.status(200).send(data)
      })
      .catch(error => {
        console.log(error)
        res.status(500).send({ message: 'Error occured: 500' })
      })
  })
}

// update

// delete : no ref to parent
