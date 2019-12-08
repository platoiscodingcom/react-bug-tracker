import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Card, List, Dropdown, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import uuid from 'uuid'
import NewTask from '../../components/tasks/NewTask'
import TaskTable from '../../components/tasks/TaskTable'
import DetailsLoader from '../../components/loader/DetailsLoader'
import StatusColor from '../../components/status/StatusColor'
import StatusButton from '../../components/status/StatusButton'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import {
  PROJECTS_PATH,
  CATEGORIES_HOME,
  PROJECTS_HOME,
  UNDEFINED,
  PROJECT
} from '../../components/Constants'

const Details = ({ match }) => {
  const [showNewTask, setShowNewTask] = useState({ show: false })
  const [project, setProject] = useState({
    _id: '',
    name: '',
    status: '',
    description: '',
    categories: [],
    tasks: []
  })

  useEffect(
    () => {
      axios.get(`${PROJECTS_PATH}/${match.params._id}`).then(response => {
        setProject(response.data)
      })
    },
    [match]
  )

  const [redirect, setRedirect] = useState(false)
  const deleteProject = (_id) => {
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

  const { _id, name, status, description, categories, tasks, updatedAt, createdAt } = project

  const listCat = categories.map(cat => (
    <span key={cat._id} className='ui label'>
      <Link to={`${CATEGORIES_HOME}/${cat._id}`}>{cat.name}</Link>
    </span>
  ))

  if (project === UNDEFINED || project._id === '') {
    return <DetailsLoader />
  } else {
    return (
      <div>
        {redirect && <Redirect to={PROJECTS_HOME} push />}

        <Container textAlign='left'>
          {showNewTask.show && (
            <NewTask
              project={project}
              setShowNewTask={setShowNewTask}
              showNewTask={showNewTask}
              setProject={setProject}
              match={match}
            />
          )}
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
                        <i className='fas fa-plus' />New Task
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
                        <i className='fas fa-trash' />Delete
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
                    Status:<StatusColor key={uuid.v4()} status={status} />
                  </div>
                </List.Item>
                <List.Item>
                    Created At: {moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                </List.Item>
                <List.Item>
                    Updated At: {moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
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
          </Card>
        </Container>

        <Container style={{ marginTop: '15px' }}>
          <TaskTable tasks={tasks} match={match} setProject={setProject} />
        </Container>
      </div>
    )
  }
}

export default Details
