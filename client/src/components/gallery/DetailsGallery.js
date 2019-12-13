import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { Image, Card, Grid, Modal, Button, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import uuid from 'uuid'

const DetailsGallery = ({ files, loadProject }) => {
  /*
useEffect(() => {
  loadProject()
}, [])*/

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
    }
  </Fragment>
  )
}

export default DetailsGallery
