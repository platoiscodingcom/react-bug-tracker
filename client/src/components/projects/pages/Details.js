import React, { useEffect, useState } from 'react'
import {
  Card,
  List,
  Header,
  Dropdown,
  Menu,
  Grid,
  Container
} from 'semantic-ui-react'
import uuid from 'uuid'
import TableTabs from '../../tasks/TableTabs'
import DetailsLoader from '../../loader/DetailsLoader'
import StatusColor from '../../status/StatusColor'
import StatusButton from '../../status/StatusButton'
import moment from 'moment'
import FileUpload from '../../gallery/FileUpload'
import DetailsGallery from '../../gallery/DetailsGallery'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink, withRouter, Link } from 'react-router-dom'
import {
  deleteProject,
  getProject,
  setUploadModalOpen
} from '../../../actions/projectActions'
import { CATEGORIES_DETAILS, PROJECTS_HOME, PROJECT } from '../../../Constants'
import NewTask from './../NewTask'
import Invitation from './../Invitation'
import Contacts from './../Contacts'
import SearchBar from './../../tasks/SearchBar'
import Activity from './../../activity/Activity'
import PermittedUsers from './../PermittedUsers'

const Details = ({
  match,
  history,
  getProject,
  deleteProject,
  setUploadModalOpen,
  project: { project }
}) => {
  const [showNewTask, setShowNewTask] = useState(false)
  const [showInvitation, setShowInvitation] = useState(false)
  const [showContacts, setShowContacts] =useState(false)

  useEffect(() => {
    getProject(match.params._id)
  }, [getProject, match, history])

  const {
    _id,
    name,
    status,
    description,
    categories,
    updatedAt,
    createdAt,
    dueDate,
    author,
    assignedTo
  } = project

  let listCat = []
  if (project.categories) {
    listCat = categories.map(cat => (
      <span key={cat._id} className='ui label'>
        <Link to={`${CATEGORIES_DETAILS}/${cat._id}`}>{cat.name}</Link>
      </span>
    ))
  }

  if (project == null || project === '') return <DetailsLoader />

  return (
    <Container fluid>
      <Menu secondary>
        <Menu.Item
          name='Details'
          as={NavLink}
          to={'/projects/details/' + match.params._id}
          active
          header
        />
        <Menu.Item
          name='Kanban'
          as={NavLink}
          to={'/projects/kanban/' + match.params._id}
        />
      </Menu>

      <Grid>
        <Grid.Column mobile={16} tablet={16} computer={12}>
          <NewTask showNewTask={showNewTask} setShowNewTask={setShowNewTask} />

          <Invitation showInvitation={showInvitation} setShowInvitation={setShowInvitation}/>

          <Contacts setShowContacts={setShowContacts} showContacts = {showContacts}/>


          <Card fluid>
            <Card.Content className='card-header'>
              <span className='card-header-title'>{name}</span>
              <Menu floated='right' className='card-menu'>
                <Dropdown className='more-details-button' item text='more'>
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
                    <Dropdown.Item>
                      <div onClick={() => setShowInvitation(true)}>
                        <i className='fas fa-user-friends'></i>
                        Invite Someone
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <div onClick={() => setShowContacts(true)}>
                        <i className='fas fa-user-friends'></i>
                        Invite a Contact
                      </div>
                    </Dropdown.Item>
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
                        {author ? author.name : ''}
                      </List.Item>

                      <List.Item>
                        <Header as='h4' floated='left'>
                          Assigned to:
                        </Header>
                        {assignedTo ? assignedTo.name : ''}
                      </List.Item>
                      <List.Item>
                        <Header as='h4' floated='left'>
                          Due Date:{' '}
                        </Header>
                        {moment(dueDate).format('MMMM Do YYYY')}
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
        </Grid.Column>

        <Grid.Column mobile={16} tablet={16} computer={4}>
          <Activity />
          <PermittedUsers />
        </Grid.Column>
      </Grid>
    </Container>
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
