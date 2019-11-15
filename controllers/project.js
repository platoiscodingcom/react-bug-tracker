const Project = require('../models/Project')
const Category = require('../models/Category')
//mongoose = require('mongoose').set('debug', true); //debug
mongoose = require('mongoose')

exports.list = (req, res) => {
  Project.find()
    .populate('tasks categories')
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.details = (req, res) => {
  Project.findById(req.params._id)
    .populate('tasks categories')
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}

exports.create = (req, res) => {
  const newProject = new Project({
    _id: new mongoose.Types.ObjectId(),
    description: req.body.description,
    name: req.body.name,
    status: req.body.status
  });
  
  //add each selcted Category to the Project
  req.body.categories.forEach((cat) =>{ 
    newProject.categories.push(cat);

    //add the Project_id to the Category: 1-m Relation
    Category.findById(cat)
      .then((data) => {
        data.projects.push(newProject._id);
        data.save()
          .catch(error => {
            console.log(error)
            res.status(500).send({ message: 'Error 500: projectController:create - save project in category' })
          })
      })
  })

  newProject.save()
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error 500: projectController:create - save new project' })
    })
}

exports.update = (req, res) => {
  /*
  Project.findByIdAndUpdate(req.params._id, req.body)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
    */

    console.log('find project by Id');

    Project.findById(req.params._id)
      .then( data => {
        console.log('for each category in oldProject .pull(project_id');
        data.categories.forEach((cat) =>{ 
      
          //remove the Project_id 
          Category.findById(cat)
            .then((data) => {
              data.projects.pull(newProject._id);
              data.save()
                .catch(error => {
                  console.log(error)
                  res.status(500).send({ message: 'Error 500: projectController:update - remove project from category' })
                })
            })
        })

        console.log('change description, status and name');
        data.description= req.body.description;
        data.name= req.body.name;
        data.status= req.body.status;

        console.log('set categoryArray to empty array');
        data.categories = [];

        console.log('for each item of the newCategoryArray: push category_id in project.category');
        req.body.categories.forEach((cat) =>{ 
          newProject.categories.push(cat);
      
          //add the Project_id to the Category: 1-m Relation
          console.log('and category.findById: push project_id into projectsarray');
          Category.findById(cat)
            .then((data) => {
              data.projects.push(newProject._id);
              data.save()
                .catch(error => {
                  console.log(error)
                  res.status(500).send({ message: 'Error 500: projectController:create - save project in category' })
                })
            })
        })

        data.save()
          .then(data => {
            res.status(200).send(data)
          })
          .catch(error => {
            console.log(error)
            res.status(500).send({ message: 'Error 500: projectController:update - update project' })
          })
      })
    
    console.log('saved the project');
}

exports.delete = (req, res) => {
  Project.findByIdAndRemove(req.params._id)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error occured: 500' })
    })
}