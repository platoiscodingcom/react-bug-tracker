const Task = require('../../models/Task')
const Project = require('../../models/Project')

exports.saveTaskToProject = (project, task) =>{
  Project.findById(project)
  .then(projectData => {
    projectData.tasks.push(task);
    projectData.save();
  })
  .catch(error => {
    console.log(error)
    res.status(500).send({ message: 'Error occured: 500' })
  })
}

exports.removeTaskFromProject = (data, req) =>{
  Project.findById(data.project)
  .then(data =>{
    const removeIndex = data.tasks.map(item => item._id.toString()).indexOf(req.params._id);
    data.tasks.splice(removeIndex, 1);
    data.save();
  })
  .catch(error => {
    console.log(error)
    res.status(500).send({ message: 'Error occured: 500' })
  })
}