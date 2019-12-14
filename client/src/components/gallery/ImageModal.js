import React from 'react'
import { Modal, Button, Image } from 'semantic-ui-react'
import moment from 'moment'

const ImageModal = ({ modalOpen, setModalOpen, modalImage }) => {
  return (
    <Modal open={modalOpen} cenetered>
    <Modal.Header>{modalImage.filename}</Modal.Header>
      <Modal.Content>
        <Image src={modalImage.path} fluid />
        <p>Mimetype:{' '}{modalImage.mimetype}</p>
        <p>Created At:{' '}
        {moment(modalImage.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setModalOpen(false)}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ImageModal
