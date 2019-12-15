const server = require('../../server')
var mv = require('mv')
var fs = require('fs')
var rimraf = require('rimraf')

//remove local client/public/projects/projectId folder
exports.removeLocalProjectIdFolder = projectId => {
  console.log(
    'Bug Erinnerung: ProjectId-folder wird beim löschen des Projects nicht entfernt'
  )
  rimraf(
    server.DIR + '\\client\\public\\projects\\' + projectId + '\\',
    err => {
      if (err) console.log(err)
    }
  )
}

//create public/projects folder if doesn't exist yet
exports.createLocalProjectsFolder = () => {
  var projects_dir = server.DIR + '\\projects'
  if (!fs.existsSync(projects_dir)) {
    fs.mkdirSync(projects_dir)
  }
}

exports.createLocalProjectIdFolder = projectId => {
  var dir = server.DIR + '\\projects\\' + projectId
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}

exports.saveProjectFileLocally = (projectId, filename, tempPath) => {
  var uploadPath = server.DIR + '\\projects\\' + projectId + '\\' + filename

  //move from oldpath(Temp) to newpath(uploadPath)
  mv(tempPath, uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err)
    }
  })
}

exports.deleteFileLocally = (data) =>{
  fs.unlink(server.DIR + data.path, err => {
    if (err) {
      console.log(err)
      res.status(500).send({ message: 'Error occured: 500' })
    }
  })
}

exports.saveProjectFile = (req, files, fields) =>{
  //public/projects
  this.createLocalProjectsFolder()
  //public/projects/project_id
  this.createLocalProjectIdFolder(req.params._id)

  this.saveProjectFileLocally(
    req.params._id,
    fields.filename,
    files.file.path
  )
}