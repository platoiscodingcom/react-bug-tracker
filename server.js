const express = require('express')
const mongoose = require('mongoose')

const authors = require('./routes/authors')
const books = require('./routes/books')

const port = 5000
const mongo_uri = 'mongodb://localhost:27017/bugtracker'

mongoose.connect(mongo_uri, { useNewUrlParser: true, useFindAndModify: false })
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
app.use('/api/autores', authors)
app.use('/api/libros', books)

app.listen({ port }, () => {
  console.log(`Server is listeing to port http://localhost:${port}`)
})