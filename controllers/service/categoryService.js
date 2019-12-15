const Project = require('../../models/Project')
const Category = require('../../models/Category')

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

exports.findAllCategories = async (res) =>{
  await Category.find()
  .then(data => {
    res.status(200).send(data)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send({ msg: 'Error 500' })
  })
}

exports.findCategoryById = async (catId, res) =>{
  await Category.findById(catId)
  .populate('projects')
  .then(data => {
    res.status(200).send(data)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send({ msg: 'Error 500' })
  })
}