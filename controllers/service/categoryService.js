const Project = require('../../models/Project')
const Category = require('../../models/Category')

exports.removeCategoryFromProject = async (projectId, catId) => {
  await Project.findById(projectId)
  .then(data => {
    data.categories.pull(catId)
    data.save()
  })
}