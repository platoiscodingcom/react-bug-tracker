import React from 'react'
import { Modal, Button, Image } from 'semantic-ui-react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteFile } from './../../actions/fileActions';
import {PROJECT} from '../../Constants'
import { getProject } from './../../actions/projectActions';


const ImageModal = ({ modalOpen, setModalOpen, modalImage, deleteFile, history, project: {project} }) => {

  const removeFile = (id) => {
    deleteFile(id, PROJECT)
    setModalOpen(false)
    getProject(project._id, history)
  }

  return (
    <Modal open={modalOpen}>
      <Modal.Header>{modalImage.filename}</Modal.Header>
      <Modal.Content>
        <Image src={modalImage.path} />
        <p>Mimetype: {modalImage.mimetype}</p>
        <p>
          Created At:{' '}
          {moment(modalImage.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setModalOpen(false)}>
          Close
        </Button>
        <Button color='red' onClick={() => removeFile(modalImage._id)}>
          <i className='fa fa-trash' aria-hidden='true'></i>
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

ImageModal.propTypes = {
  deleteFile:PropTypes.func.isRequired,
  getProject:PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  project: state.project
})

export default connect(mapStateToProps, {deleteFile, getProject})(ImageModal)
