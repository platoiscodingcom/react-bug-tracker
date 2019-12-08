const Task = require('../../models/Task')
const Project = require('../../models/Project')

exports.saveTaskToProject = async (project, task) =>{
  await Project.findById(project)
  .then(projectData => {
    projectData.tasks.push(task);
    projectData.save();
  })
  .catch(error => {
    console.log(error)
    res.status(500).send({ message: 'Error occured: 500' })
  })
}

exports.deleteTaskFromProject = async (data, taskId) =>{
  await Project.findById(data.project)
  .then(data =>{
    data.tasks.pull(taskId);
  })
  .catch(error => {
    console.log(error)
    res.status(500).send({ message: 'Error occured: 500' })
  })
}