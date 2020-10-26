exports.create = async (documentId, estimated) =>{
  try {
    const newWorkingTime = new WorkingTime({
      _id: new mongoose.Types.ObjectId(),
      documentId: documentId,
      estimated: estimated,
      remaining: estimated,
      logged: 0,
      logs: []
    })

    await newWorkingTime.save()

  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error occured: 500' })
  }
}