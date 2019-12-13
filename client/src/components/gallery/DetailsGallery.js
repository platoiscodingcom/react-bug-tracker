import React, { Fragment } from 'react'
import { Image, Card, Grid } from 'semantic-ui-react'

const DetailsGallery = ({ files }) => {

  const filesList = files.map(file => (
    <Grid.Column>
      <Card key={file._id}>
        <Card.Content>
          <Image src={file.path} size='small' />
        </Card.Content>
        <Card.Content extra>löschen</Card.Content>
      </Card>
    </Grid.Column>
  ))

  console.log('files', files)
  return (
    <Fragment>
      <Grid>
        <Grid.Row columns={6}>{filesList}</Grid.Row>
      </Grid>

      {
        //Modal
        //make new component and set img_id and path to props
      }
    </Fragment>
  )
}

export default DetailsGallery
