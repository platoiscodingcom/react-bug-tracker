import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Card, List, Dropdown, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import uuid from 'uuid'
import TaskTable from '../../components/tasks/TaskTable'
import DetailsLoader from '../../components/loader/DetailsLoader'
import StatusColor from '../../components/status/StatusColor'
import StatusButton from '../../components/status/StatusButton'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import FileUpload from '../../components/gallery/FileUpload'
import DetailsGallery from '../../components/gallery/DetailsGallery'
import {
  PROJECTS_PATH,
  CATEGORIES_DETAILS,
  PROJECTS_HOME,
  PROJECT
} from '../../components/Constants'

const Details = ({ match }) => {
  const [showNewTask, setShowNewTask] = useState({ show: false })
  const [isUploadOpen, setIsUploadOpen] = useState({ show: false })
  const [fileUploaded, setFileUploaded] = useState(false)
  const [project, setProject] = useState({
    _id: '',
    name: '',
    status: '',
    description: '',
    categories: [],
    tasks: [],
    files: []
  })

  const loadProject = () =>{
    axios
    .get(`${PROJECTS_PATH}/${match.params._id}`)
    .then(response => {
      setProject(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    loadProject()
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [match])

  //reload Details after FileUpload
  useEffect(() =>{
    if(fileUploaded){
      loadProject()
      setFileUploaded(false)
    }
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [fileUploaded])

  const [redirect, setRedirect] = useState(false)
  const deleteProject = _id => {
    axios
      .delete(`${PROJECTS_PATH}/${_id}`)
      .then(res => {
        if (res.status === 200) {
          setRedirect(true)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  const {
    _id,
    name,
    status,
    description,
    categories,
    tasks,
    files,
    updatedAt,
    createdAt
  } = project

  let listCat = []
  if (project.categories) {
    listCat = categories.map(cat => (
      <span key={cat._id} className='ui label'>
        <Link to={`${CATEGORIES_DETAILS}/${cat._id}`}>{cat.name}</Link>
      </span>
    ))
  }


  if (project == null || project._id === '') {
    return <DetailsLoader />
  } else {
    return (
      <div>
        {redirect && <Redirect to={PROJECTS_HOME} push />}

        <Container>
          <Card fluid>
            <Card.Content className='card-header'>
              <span className='card-header-title'>{name}</span>
              <Menu floated='right' className='card-menu'>
                <Dropdown item text='more'>
                  <Dropdown.Menu className='card-actions-dropdown'>
                    <Dropdown.Item>
                      <div
                        onClick={() =>
                          setShowNewTask({ show: !showNewTask.show })
                        }
                      >
                        <i className='fas fa-plus' />
                        New Task
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <div
                        onClick={() =>
                          setIsUploadOpen({ show: !setIsUploadOpen.show })
                        }
                      >
                        <i className='fas fa-upload' />
                        Upload File
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item
                      text='Edit'
                      icon='pencil alternate'
                      as={Link}
                      to={`${PROJECTS_HOME}/${_id}`}
                    />
                    <Dropdown.Item color={'red'}>
                      <div onClick={() => deleteProject(_id)}>
                        <i className='fas fa-trash' />
                        Delete
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu>
            </Card.Content>
            <Card.Content>
              <List>
                <List.Item>
                  <div>
                    Status:
                    <StatusColor key={uuid.v4()} status={status} />
                  </div>
                </List.Item>
                <List.Item>
                  Created At:{' '}
                  {moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                </List.Item>
                <List.Item>
                  Updated At:{' '}
                  {moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
                </List.Item>

                <List.Item>
                  <div>Categories:{listCat}</div>
                </List.Item>
              </List>
            </Card.Content>
            <Card.Content description={description} />
            <Card.Content extra>
              <StatusButton
                status={status}
                id={_id}
                setDocument={setProject}
                documentType={PROJECT}
              />
            </Card.Content>

            <Card.Content extra>
              <DetailsGallery files={files} loadProject={loadProject}/>
            </Card.Content>
          </Card>
        </Container>

        <TaskTable tasks={tasks} match={match} setProject={setProject} />

        <FileUpload
          documentPath={PROJECTS_PATH}
          documentId={match.params._id}
          isUploadOpen={isUploadOpen}
          setIsUploadOpen={setIsUploadOpen}
          loadDocument={loadProject}
          setFileUploaded={setFileUploaded}
        />
      </div>
    )
  }
}

export default Details
