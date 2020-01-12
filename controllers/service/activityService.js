exports.createActivity = async (documentId, documentType, action, user) => {
  try {
    if (documentType === 'project' || documentType === 'task') {
      const newActvity = new Acitivty({
        _id: new mongoose.Types.ObjectId(),
        action: action,
        user: user._id,
        documentType: documentType,
        documentId: documentId
      })

      await newActvity.save()
    } else {
      return res
        .status(500)
        .send({ message: 'Error 500 No such document type' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Error 500' })
  }
}
