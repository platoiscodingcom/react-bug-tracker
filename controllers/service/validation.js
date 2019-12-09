exports.mongoIdValid = (id) =>{
  // Check for ObjectId format and post
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).send({ message: 'Not found' })
  }
}