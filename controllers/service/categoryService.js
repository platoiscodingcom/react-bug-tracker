const Project = require('../../models/Project')

exports.removeCategoryFromAllProjects = (data, req) =>{
  data.projects.forEach(project =>{
    Project.findById(project)
    .then(data=>{
      data.categories.pull(req.params._id);
      data.save();
    })
    data.remove();
  })
}