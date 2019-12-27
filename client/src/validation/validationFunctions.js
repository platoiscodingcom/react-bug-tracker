import { STRING_REGEX } from './RegExConstants'
import { FILE_TYPES } from '../Constants'

export const validateString = value => {
  if (!value) return 'Field is required'
  else if (!STRING_REGEX.test(value)) return 'Must have at least 4 characters'
  else return null
}

export const validateSelect = value => {
  if (!value || value.length === 0) return 'Field is required'
  else return null
}

export const validateText = value => {
  if (!value) return 'Must have at least 4 characters'
  else if (value.length < 4) return 'Field is required'
  else return null
}

export const errorsEmpty = data => {
  for (var key in data) {
    if (data[key] !== null) {
      return false
    }
  }
  return true
}

export const checkMimeType = event => {
  let file = event.target.files
  let err = ''

  if (FILE_TYPES.every(type => file[0].type !== type)) {
    err = 'Only supports images, pdf, plain text, word and excel documents'
  }

  if (err !== '') {
    event.target.value = null // discard selected file
    console.log(err)
    return false
  }
  return true
}

// maxSize of File for MongoDb is 16mb
export const checkSize = event => {
  let file = event.target.files[0]
  let err = ''

  // 16MB = 16.777.216 Bytes
  const maxSize = 16000000
  if (file.size > maxSize) {
    err = 'File may not be larger than 16 MB'
  }

  if (err !== '') {
    event.target.value = null // discard selected file
    console.log(err)
    return false
  }
  return true
}

export const inspectFormData = formData => {
  for (var pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1])
  }
}
