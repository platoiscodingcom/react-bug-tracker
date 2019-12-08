const Project = require('../../models/Project')

exports.removeCategoryFromAllProjects = (data, req) =>{
  data.projects.forEach(async (project) =>{
    await roject.findById(project)
    .then(data=>{
      data.categories.pull(req.params._id);
      data.save();
    })
    data.remove();
  })
}