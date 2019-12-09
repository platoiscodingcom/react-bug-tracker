const Project = require('../../models/Project')

exports.removeCategoryFromAllProjects = (projects, catId) => {
  projects.forEach(async project => {
    await Project.findById(project._id)
      .then(data => {
        data.categories.pull(catId)
        data.save()
      })
      .catch(error => {
        console.log(error)
        res.status(500).send({ message: 'Error 500' })
      })
    data.remove()
  })
}
