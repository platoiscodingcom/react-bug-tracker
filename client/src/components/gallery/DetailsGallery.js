import axios from 'axios'
import React, { Fragment, useState } from 'react'
import { Image, Card, Grid, Button } from 'semantic-ui-react'
import ImageModal from './ImageModal'
import uuid from 'uuid'
import { FILES_PATH } from '../Constants'

const DetailsGallery = ({ files, loadProject }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalImage, setModalImage] = useState({})

  //todo:
  //filter if image, then display image
  //display placeholder for every file that is not an image

  const filesList = files.map(file => (
    <Grid.Column key={uuid.v4()}>
      <Card key={file._id}>
        <Card.Content>
          <Image
            key={uuid.v4()}
            src={file.path}
            size='small'
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setModalOpen(true)
              setModalImage(file)
            }}
          />
        </Card.Content>
        <Card.Content extra>
          <Button
            color='red'
            circular
            compact
            size='mini'
            onClick={() => deleteFile(file._id)}
          >
            <i className='fa fa-trash' aria-hidden='true'></i>
          </Button>
        </Card.Content>
      </Card>
    </Grid.Column>
  ))

  //erstelle ein fileController
  //suche dort innerhalb der projects nach einem project der diese file hat
  //lösche von dort die file
  //außerdem: impl. löschcng der file bei löschung des projeccts
  //und zwar sowohl die verknüpfung als auch die file und den ordner
  const deleteFile = _id => {
    axios
      .delete(`${FILES_PATH}/deleteFromProject/${_id}`)
      .then(() => {
        setModalOpen(false)
        loadProject()
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Fragment>
      <Grid>
        <Grid.Row key={uuid.v4()} columns={6}>
          {filesList}
        </Grid.Row>
      </Grid>

      <ImageModal
        key={modalImage._id}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalImage={modalImage}
        deleteFile={deleteFile}
      />
    </Fragment>
  )
}

export default DetailsGallery
