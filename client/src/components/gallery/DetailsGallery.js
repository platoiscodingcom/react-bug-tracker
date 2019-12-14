import React, { Fragment, useState } from 'react'
import { Image, Card, Grid } from 'semantic-ui-react'
import ImageModal from './ImageModal'
import uuid from 'uuid'

const DetailsGallery = ({ files }) => {
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
        <Card.Content extra>löschen</Card.Content>
      </Card>
    </Grid.Column>
  ))

  return (
    <Fragment>
      <Grid>
        <Grid.Row key={uuid.v4()} columns={6}>{filesList}</Grid.Row>
      </Grid>

      <ImageModal
        key={modalImage._id}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalImage={modalImage}
      />
    </Fragment>
  )
}

export default DetailsGallery
