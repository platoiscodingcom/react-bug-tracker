import React from 'react'
import { Modal, Button, Image } from 'semantic-ui-react'
import moment from 'moment'

const ImageModal = ({ modalOpen, setModalOpen, modalImage, deleteFile }) => {
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
        <Button color='red' onClick={() => deleteFile(modalImage._id)}>
          <i className='fa fa-trash' aria-hidden='true'></i>
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ImageModal
