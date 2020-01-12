const Acitivty = require('../../models/Activity')
mongoose = require('mongoose')

exports.createActivity = (documentId, documentName,documentType, action, userId) => {
  if (documentType === 'project' || documentType === 'task') {
    const newActvity = new Acitivty({
      _id: new mongoose.Types.ObjectId(),
      action: action,
      user: userId,
      documentType: documentType,
      documentName: documentName,
      documentId: documentId
    })

    newActvity.save()
  } else {
    console.log('Error 500 No such document type')
  }
}
