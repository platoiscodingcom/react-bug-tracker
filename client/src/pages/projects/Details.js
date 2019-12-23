import React, { useEffect, useState } from 'react'
import { Card, List, Header, Dropdown, Menu, Grid, Tab } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import uuid from 'uuid'
import TableTabs from '../../components/tasks/TableTabs'
import DetailsLoader from '../../components/loader/DetailsLoader'
import StatusColor from '../../components/status/StatusColor'
import StatusButton from '../../components/status/StatusButton'
import moment from 'moment'
import FileUpload from '../../components/gallery/FileUpload'
import DetailsGallery from '../../components/gallery/DetailsGallery'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {
  deleteProject,
  getProject,
  setUploadModalOpen
} from '../../actions/projectActions'
import {
  CATEGORIES_DETAILS,
  PROJECTS_HOME,
  PROJECT
} from '../../components/Constants'
import NewTask from './../../components/projects/NewTask'
import SearchBar from './../../components/tasks/SearchBar';

const Details = ({
  match,
  history,
  getProject,
  deleteProject,
  setUploadModalOpen,
  project: { project }
}) => {
  const [showNewTask, setShowNewTask] = useState(false)

  useEffect(() => {
    getProject(match.params._id, history)
  }, [getProject, match, history])

  const {
    _id,
    name,
    status,
    description,
    categories,
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



  if (project == null || project._id === '') return <DetailsLoader />

  return (
    <div>
      <NewTask showNewTask={showNewTask} setShowNewTask={setShowNewTask} />

      <Card fluid>
        <Card.Content className='card-header'>
          <span className='card-header-title'>{name}</span>
          <Menu floated='right' className='card-menu'>
            <Dropdown item text='more'>
              <Dropdown.Menu className='card-actions-dropdown'>
                <Dropdown.Item>
                  <div onClick={() => setShowNewTask(true)}>
                    <i className='fas fa-plus' />
                    New Task
                  </div>
                </Dropdown.Item>

                <Dropdown.Item>
                  <div onClick={() => setUploadModalOpen(true)}>
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
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <List>
                  <List.Item>
                    <Header as='h4' floated='left'>
                      Status:
                    </Header>
                    <StatusColor key={uuid.v4()} status={status} />
                  </List.Item>
                  <List.Item>
                    <Header as='h4' floated='left'>
                      Created At:{' '}
                    </Header>
                    {moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                  </List.Item>
                  <List.Item>
                    <Header as='h4' floated='left'>
                      Updated At:{' '}
                    </Header>
                    {moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
                  </List.Item>
                  <List.Item>
                    <Header as='h4' floated='left'>
                      Categories:{listCat}
                    </Header>
                  </List.Item>
                </List>
              </Grid.Column>
              <Grid.Column>
                <List>
                  <List.Item>
                    <Header as='h4' floated='left'>
                      Author:
                    </Header>
                  </List.Item>

                  <List.Item>
                    <Header as='h4' floated='left'>
                      Assigned to:
                    </Header>
                  </List.Item>
                  <List.Item>
                    <Header as='h4' floated='left'>
                      Due Date:{' '}
                    </Header>
                    {/*{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')} */}
                  </List.Item>
                  <List.Item>
                    <Header as='h4' floated='left'>
                      Estimated Working Time:
                    </Header>
                  </List.Item>
                </List>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
        <Card.Content description={description} />
        <Card.Content extra>
          <StatusButton status={status} documentType={PROJECT} />
        </Card.Content>

        <Card.Content extra>
          <DetailsGallery />
        </Card.Content>
      </Card>

      <SearchBar />

      <TableTabs />

      <FileUpload />
    </div>
  )
}

Details.propTypes = {
  deleteProject: PropTypes.func.isRequired,
  getProject: PropTypes.func.isRequired,
  setUploadModalOpen: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  project: state.project
})

export default withRouter(
  connect(mapStateToProps, {
    deleteProject,
    getProject,
    setUploadModalOpen
  })(Details)
)
