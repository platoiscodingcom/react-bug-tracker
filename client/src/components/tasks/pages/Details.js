import React, { useEffect, useState } from 'react'
import moment from 'moment'
import {
  Card,
  List,
  Dropdown,
  Menu,
  Grid,
  Header,
  Container
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { TypeIcon } from '../TaskIcons'
import StatusColor from '../../status/StatusColor'
import uuid from 'uuid'
import DetailsLoader from '../../loader/DetailsLoader'
import StatusButton from '../../status/StatusButton'
import { TASKS_HOME, TASK, PROJECTS_DETAILS } from '../../../Constants'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { deleteTask, getTask } from './../../../actions/taskActions'
import LogWorkingTimeModal from '../../logWorkingTime/LogWorkingTimeModal'
import WorkingTimeCard from '../../logWorkingTime/WorkingTimeCard'

const Details = ({ match, history, getTask, deleteTask, task: { task } }) => {
  useEffect(() => {
    getTask(match.params._id, history)
  }, [getTask, match, history])

  const [openLogTimeModal, setOpenLogTimeModal] = useState(false)

  const {
    _id,
    title,
    status,
    description,
    priority,
    type,
    updatedAt,
    createdAt,
    dueDate,
    author,
    assignedTo
  } = task

  if (task == null || task === '') return <DetailsLoader />

  let projectName = ''
  let projectId = ''
  if (task.project) {
    projectName = task.project.name
    projectId = task.project._id
  }

  return (
    <Container fluid>
      <Grid>
        <Grid.Column mobile={16} tablet={16} computer={12}>
          <LogWorkingTimeModal
            setOpenLogTimeModal={setOpenLogTimeModal}
            openLogTimeModal={openLogTimeModal}
            type={TASK}
          />
          <Card fluid>
            <Card.Content className='card-header'>
              <span className='card-header-title'>{title}</span>
              <Menu floated='right' className='card-menu'>
                <Dropdown item text='more'>
                  <Dropdown.Menu className='card-actions-dropdown'>
                    <Dropdown.Item
                      text='Edit'
                      icon='pencil alternate'
                      as={Link}
                      to={`${TASKS_HOME}/${_id}`}
                    />
                    <Dropdown.Item color={'red'}>
                      <div
                        onClick={() => setOpenLogTimeModal(!openLogTimeModal)}
                      >
                        <i className='fas fa-hourglass-half' />
                        Log Working Time
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item color={'red'}>
                      <div onClick={() => deleteTask(_id)}>
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
                        <div>
                          Status:
                          <StatusColor key={uuid.v4()} status={status} />
                        </div>
                      </List.Item>
                      <List.Item>
                        <div>
                          Type:
                          <TypeIcon key={uuid.v4()} type={type} />
                        </div>
                      </List.Item>
                      <List.Item>
                        <div>Priority:{`${priority}`}</div>
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
                        <div>
                          Project:
                          <span className='ui label'>
                            <Link to={`${PROJECTS_DETAILS}/${projectId}`}>
                              {projectName}
                            </Link>
                          </span>
                        </div>
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
              <StatusButton status={status} documentType={TASK} />
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={16} computer={4}>
          <WorkingTimeCard />
        </Grid.Column>
      </Grid>
    </Container>
  )
}

Details.propTypes = {
  deleteTask: PropTypes.func.isRequired,
  getTask: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  task: state.task
})

export default withRouter(
  connect(mapStateToProps, { deleteTask, getTask })(Details)
)
