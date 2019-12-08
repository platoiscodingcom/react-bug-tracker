import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import {
  Container,
  Card,
  List,
  Dropdown,
  Menu
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { TypeIcon } from '../../components/tasks/TaskIcons'
import StatusColor from '../../components/status/StatusColor'
import uuid from 'uuid'
import { Redirect } from 'react-router-dom'
import DetailsLoader from '../../components/loader/DetailsLoader'
import StatusButton from '../../components/status/StatusButton'
import {
  TASKS_PATH,
  PROJECTS_HOME,
  TASKS_HOME,
  TASK
} from '../../components/Constants'

const Details = ({ match }) => {
  const [task, setTask] = useState({
    _id: '',
    title: '',
    project: '',
    description: '',
    status: '',
    priority: '',
    type: ''
  })

  useEffect(
    () => {
      axios.get(`${TASKS_PATH}/${match.params._id}`).then(response => {
        setTask(response.data)
      })
    },
    [match]
  )

  const [redirect, setRedirect] = useState(false)
  const deleteTask = _id => {
    axios.delete(`${TASKS_PATH}/${_id}`).then(res => {
      if (res.status === 200) {
        setRedirect(true)
      }
    })
  }

  const { _id, title, status, description, project, priority, type, updatedAt, createdAt } = task

  if (task == null || task._id === '') {
    return <DetailsLoader />
  } else {
    return (
      <div>
        {redirect && <Redirect to={PROJECTS_HOME} push />}
        <Container>
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
                    Created At: {moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                </List.Item>
                <List.Item>
                    Updated At: {moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
                </List.Item>
                <List.Item>
                  <div>
                    Project:<span className='ui label'>{project.name}</span>
                  </div>
                </List.Item>
              </List>
            </Card.Content>

            <Card.Content description={description} />
            <Card.Content extra>
            <StatusButton
                status={status}
                id={_id}
                setDocument={setTask}
                documentType={TASK}
              />
            </Card.Content>
          </Card>
        </Container>
      </div>
    )
  }
}

export default Details
