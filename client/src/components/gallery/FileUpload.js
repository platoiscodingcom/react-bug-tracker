import React, { useState } from 'react'
import { Form, Modal, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createFile } from '../../actions/fileActions'
import {
  checkMimeType,
  checkSize,
  inspectFormData
} from '../../validation/validationFunctions'
import { PROJECTS_PATH } from './../../Constants'
import { setUploadModalOpen } from './../../actions/projectActions'
import { getProject } from '../../actions/projectActions'
import {  withRouter} from 'react-router-dom'

const FileUpload = ({
  setUploadModalOpen,
  createFile,
  project: { project, modalOpen }
}) => {
  const [file, setFile] = useState({})
  const [filename, setFilename] = useState('')

  const handleFile = event => {
    console.log('handleFile:', event.target.files)
    if (checkMimeType(event) && checkSize(event)) {
      const formData = new FormData()

      formData.append('file', event.target.files[0])
      formData.append('filename', Date.now() + event.target.files[0].name)
      formData.append('mimetype', event.target.files[0].type)

      setFilename(event.target.files[0].name)
      setFile(formData)
      inspectFormData(formData)
    }
  }

  const documentPath = PROJECTS_PATH

  const uploadFile = () => {
    if (file) {
      setUploadModalOpen(false)
      setFilename('')
      createFile(file, documentPath, project._id)
      getProject(project._id)
    }
  }

  return (
    <Modal open={modalOpen} centered>
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
              type='button'
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
          type='button'
          color='black'
          content='Close'
          onClick={() => setUploadModalOpen(false)}
        />
      </Modal.Actions>
    </Modal>
  )
}

FileUpload.propTypes = {
  createFile: PropTypes.func.isRequired,
  setUploadModalOpen: PropTypes.func.isRequired,
  getProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  project: state.project
})

export default withRouter(connect(mapStateToProps, {
  createFile,
  setUploadModalOpen,
  getProject
})(FileUpload))
