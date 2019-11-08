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

/*
const Category = require('./models/Category');
var category1 = new Category({name:"football"});
category1.save();*/