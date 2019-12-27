import React, { Fragment, useState, useEffect } from 'react'
import { Image, Card, Grid, Button } from 'semantic-ui-react'
import ImageModal from './ImageModal'
import uuid from 'uuid'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProject } from '../../actions/projectActions'
import { deleteFile } from '../../actions/fileActions'
import { PROJECT } from '../../Constants'

const DetailsGallery = ({
  getProject,
  project: { project },
  history,
  deleteFile
}) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalImage, setModalImage] = useState({})

  const [files, setFiles] = useState([])

  //todo:
  //filter if image, then display image
  //display placeholder for every file that is not an image

  useEffect(() =>{
    if(project.files) setFiles(project.files)
  },[project.files])

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
            onClick={() => removeFile(file._id)}
          >
            <i className='fa fa-trash' aria-hidden='true'></i>
          </Button>
        </Card.Content>
      </Card>
    </Grid.Column>
  ))

  const removeFile = id => {
    //mach erstmal zwei FileUpload files für jew. Project und Task
    console.log('deleteFile')
    deleteFile(id, PROJECT)
    setModalOpen(false)
    getProject(project._id, history)
  }

  return (
    <Fragment>
      <Grid>
        <Grid.Row key={uuid.v4()} columns={6}>
          {filesList}
        </Grid.Row>
      </Grid>

      
      <ImageModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalImage={modalImage}
      />
    </Fragment>
  )
}

DetailsGallery.propTypes = {
  project: PropTypes.object.isRequired,
  getProject: PropTypes.func.isRequired,
  deleteFile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  project: state.project
})

export default connect(mapStateToProps, { getProject, deleteFile })(
  DetailsGallery
)
