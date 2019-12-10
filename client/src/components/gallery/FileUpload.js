import React, { useState, useEffect } from 'react'
import { Card, Form, Button } from 'semantic-ui-react'
import axios from 'axios'
import {
  checkMimeType,
  checkSize,
  inspectFormData
} from '../../validation/validationFunctions'

const FileUpload = ({ setDocument, documentPath, documentId }) => {
  const [file, setFile] = useState({
    description: ''
  })

  useEffect(() => {
    setFile({
      description: ''
    })
  }, [])

  const handleFile = event => {
    if (checkMimeType(event) && checkSize(event)) {
      const formData = new FormData()
      formData.append('file', event.target.files[0])
      formData.append('filename', event.target.files[0].name)
      if (file.description) {
        formData.append('description', file.description)
      }
      formData.append('mimetype', event.target.files[0].type)
      inspectFormData(formData)

      setFile(formData)
    }
  }

  const uploadFile = () => {
    if (file) {
      axios
        .put(`${documentPath}/${documentId}/upload`, file)
        .then(response => {
          setDocument(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const handleInputChange = (event, { name, value }) => {
    setFile(previousValue => ({ ...previousValue, [name]: value }))
  }

  return (
    <Card fluid>
      <Card.Content>
        <Form widths='equal'>
          <Form.Group>
            <Form.Input
              className='inputfile'
              type='file'
              id='file'
              name='filename'
              onChange={handleFile}
            />
            <label htmlFor='file'>Choose a file</label>

            <Button
              color='grey'
              content='Upload'
              onClick={uploadFile}
              icon='upload'
            />
          </Form.Group>
          <Form.Group>
            <Form.TextArea
              label='description'
              name='description'
              value={file.description}
              onChange={handleInputChange}
              rows='3'
            />
          </Form.Group>
        </Form>
      </Card.Content>
    </Card>
  )
}

export default FileUpload
