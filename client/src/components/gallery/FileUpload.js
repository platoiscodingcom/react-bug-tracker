import React, { useState, useEffect } from 'react'
import { Form, Modal, Button } from 'semantic-ui-react'
import axios from 'axios'
import {
  checkMimeType,
  checkSize
} from '../../validation/validationFunctions'

const FileUpload = ({
  setDocument,
  documentPath,
  documentId,
  isUploadOpen,
  setIsUploadOpen
}) => {
  const [file, setFile] = useState({})
  const [filename, setFilename] = useState('')

  const handleFile = event => {
    if (checkMimeType(event) && checkSize(event)) {
      const formData = new FormData()
      formData.append('file', event.target.files[0])
      formData.append('filename', event.target.files[0].name)
      formData.append('mimetype', event.target.files[0].type)
      setFilename(event.target.files[0].name)
      setFile(formData)
    }
  }

  const uploadFile = () => {
    if (file) {
      axios
        .put(`${documentPath}/${documentId}/upload`, file)
        .then(response => {
          setIsUploadOpen({ show: false })
          setDocument(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  return (
    <Modal open={isUploadOpen.show} centered>
      <Modal.Header>Upload File </Modal.Header>
      <Modal.Content>
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
              color='green'
              content='Upload'
              onClick={uploadFile}
              icon='upload'
            />
          </Form.Group>
        </Form>
        {filename && <span>{filename}</span>}
      </Modal.Content>
      <Modal.Actions>
        <Button
          color='black'
          content='Close'
          onClick={() => setIsUploadOpen({ show: false })}
        />
      </Modal.Actions>
    </Modal>
  )
}

export default FileUpload
