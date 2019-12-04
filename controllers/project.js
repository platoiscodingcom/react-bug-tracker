const Project = require('../models/Project')
const Category = require('../models/Category')
//mongoose = require('mongoose').set('debug', true); //debug
mongoose = require('mongoose')

exports.list = (req, res) => {
  Project.find()
    .populate('tasks categories')
    .then(data => {
      res.status(200).send(data);
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
        console.log('sollte das CATCH nicht aus der klammer raus?');
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

/*
To Update:
remove any refrence to this project from Categories.projects
set Projects.categories = []
push each req.body.category to Projects.categories
and include a reference to this Project to each pushed Category
*/
exports.update = (req, res) => {

    //find project by Id
    Project.findById(req.params._id)
    .then(data => {
      data.name = req.body.name;
      data.status = req.body.status;
      data.description = req.body.description;

      //remove any reference to this project from all categories
      data.categories.forEach(cat =>{
        Category.findById(cat)
         .then(catData =>{
           catData.projects.pull(data._id)
           catData.save()
         })
         .catch(error => {
          console.log(error)
          res.status(500).send({ message: 'Error 500: projectController:update - remove projectRef from categoryModels' })
        })
      })

      data.categories = [];
      //set data.categories to empty array

      req.body.categories.forEach((cat)=>{
        data.categories.push(cat);

        Category.findById(cat)
          .then(catData => {
            catData.projects.push(data._id)
            catData.save()
          })
          .catch(error => {
            console.log(error)
            res.status(500).send({ message: 'Error 500: projectController:update - save projectRef to categoryModels' })
          })

      })
      
      data.save();
      res.status(200).send(data);
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ message: 'Error: 500 in projectController:update' })
    })

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