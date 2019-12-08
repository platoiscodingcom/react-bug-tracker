const express = require('express')
const mongoose = require('mongoose')

const projects = require('./routes/projects')
const tasks = require('./routes/tasks')
const categories = require('./routes/categories')

const port = 5000
const mongo_uri = 'mongodb://localhost:27017/bugtracker'

mongoose
  .connect(
    mongo_uri,
    { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }
  )
  .then(() => {
    console.log(`connecting to database: ${mongo_uri}`)
  })
  .catch(err => {
    console.log('Error while connecting to database')
    console.log('Terminating application...')
    process.exit()
  })

const app = express()

app.use(express.json())
app.use('/api/projects', projects)
app.use('/api/tasks', tasks)
app.use('/api/categories', categories)

app.listen({ port }, () => {
  console.log(`Server is listeing to port http://localhost:${port}`)
})

// Get the default connection
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

/// //////////////////////////////
// prepare db
db.dropDatabase()

const Category = require('./models/Category')
const Project = require('./models/Project')
const Task = require('./models/Task')

var category1 = new Category({
  _id: new mongoose.Types.ObjectId(),
  name: 'Software Projects',
  projects: []
})

var category2 = new Category({
  _id: new mongoose.Types.ObjectId(),
  name: 'Crafts Projects',
  projects: []
})

var project1 = new Project({
  _id: new mongoose.Types.ObjectId(),
  name: 'testproject',
  status: 'open',
  description:
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
  categories: [category1, category2]
})

category1.projects.push(project1)
category1.save()
category2.projects.push(project1)
category2.save()

var task1 = new Task({
  _id: new mongoose.Types.ObjectId(),
  title: 'testTask',
  project: project1,
  description:
    'dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et a',
  priority: 'low',
  status: 'open'
})
task1.save()
var task2 = new Task({
  _id: new mongoose.Types.ObjectId(),
  title: 'testTask2',
  project: project1,
  description:
    'dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et a',
  priority: 'high',
  status: 'in progress'
})
task2.save()
var task3 = new Task({
  _id: new mongoose.Types.ObjectId(),
  title: 'testTask3',
  project: project1,
  type: 'feature',
  description:
    'it amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, se',
  priority: 'critical',
  status: 'closed'
})
task3.save()
var task4 = new Task({
  _id: new mongoose.Types.ObjectId(),
  title: 'testTask4',
  project: project1,
  type: 'bug',
  description:
    ' dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolo',
  priority: 'medium',
  status: 'reopened'
})
task4.save()

project1.tasks.push(task1)
project1.tasks.push(task2)
project1.tasks.push(task3)
project1.tasks.push(task4)
project1.save()
