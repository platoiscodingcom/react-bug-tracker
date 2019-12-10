import React, { useState } from 'react'
import { Card, Form, Button } from 'semantic-ui-react'
import axios from 'axios'
import { FILES_PATH } from '../../components/Constants'

const FileUpload = ({ setProject }) => {
  const checkMimeType = event => {
    let file = event.target.files
    let err = ''

    const types = ['image/png', 'image/jpeg', 'image/gif']
    if (types.every(type => file[0].type !== type)) {
      err = ' is not a supported format\n'
    }

    if (err !== '') {
      event.target.value = null // discard selected file
      console.log(err)
      return false
    }
    return true
  }

  // maxSize of File for MongoDb is 16mb
  const checkSize = event => {
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

  const [file, setFile] = useState()

  const inspectFormData = formData => {
    for (var pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1])
    }
  }

  const handleImage = event => {
    if (checkMimeType(event) && checkSize(event)) {
      const formData = new FormData()
      formData.append('file', event.target.files[0])
      formData.append('filename', `${Date.now()}-${event.target.files[0].name}}`)
      formData.append('mimetype', event.target.files[0].type)
      inspectFormData(formData)

      setFile(formData)
    }
  }

  const uploadImage = () => {
    // anstatt file kommt: options
    //var options = { content: file }
    if (file) {
      console.log('trynaupload')

      axios
        .put(FILES_PATH, file)
        .then(response => {
          setProject(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  return (
    <Card fluid>
      <Card.Content>
        <Form>
          <Form.Field>
            <Form.Input
              type='file'
              id='file'
              name='filename'
              onChange={handleImage}
            />
            <Button content='Upload' onClick={uploadImage} />
          </Form.Field>
        </Form>
      </Card.Content>
    </Card>
  )
}

export default FileUpload
