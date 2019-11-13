const express = require('express')
const mongoose = require('mongoose')

const projects = require('./routes/projects')
const tasks = require('./routes/tasks')
const categories = require('./routes/categories')

const port = 5000
const mongo_uri = 'mongodb://localhost:27017/bugtracker'

//mongodb+srv://plato:Durebit8@cluster0-8qii3.azure.mongodb.net/test?retryWrites=true&w=majority

mongoose.connect(mongo_uri, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
  .then(() => {
    console.log(`connecting to database: ${mongo_uri}`)
  })
  .catch(err => {
    console.log('Error while connecting to database')
    console.log('Terminating application...')
    process.exit()
  })

const app = express();

app.use(express.json());
app.use('/api/projects', projects);
app.use('/api/tasks', tasks);
app.use('/api/categories', categories);

app.listen({ port }, () => {
  console.log(`Server is listeing to port http://localhost:${port}`)
})

//Get the default connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//prepare db
db.dropDatabase();

const Category = require('./models/Category');
const Project = require('./models/Project');
const Task = require('./models/Task');

var category1 = new Category({
  _id: new mongoose.Types.ObjectId(), 
  name:"Software Projects", 
  projects: []
});

var category2 = new Category({
  _id: new mongoose.Types.ObjectId(), 
  name:"Crafts Projects", 
  projects: []
});

var project1 = new Project({
  _id: new mongoose.Types.ObjectId(), 
  name:"testproject",
  status: "open",
  description: "lorem ipsm",
  categories: [category1, category2]
})

category1.projects.push(project1);
category1.save();
category2.projects.push(project1);
category2.save();

var task1 = new Task({
  _id: new mongoose.Types.ObjectId(), 
  title: "testTask",
  project: project1,
  description: "desc",
  priority: "low",
  status: "open"
});
task1.save();

project1.tasks.push(task1);
project1.save();