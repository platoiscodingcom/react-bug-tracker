import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Button, Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createTask } from './../../../actions/taskActions'
import SemanticDatepicker from 'react-semantic-ui-datepickers'
import {
  OPEN,
  FEATURE,
  LOW,
  PROJECTS_PATH,
  TASKS_HOME,
  TYPE_OPTIONS,
  STATUS_OPTIONS,
  PRIORITY_OPTIONS,
  USERS_PATH
} from '../../../Constants'

const Create = ({ createTask, errors, history, match, auth: { user } }) => {
  const [userOptions, setUserOptions] = useState([])
  const [projects, setProjects] = useState([])
  const [permittedUsers, setPermittedUsers] = useState([])
  const [task, setTask] = useState({
    title: '',
    project: '',
    description: '',
    status: OPEN,
    priority: LOW,
    type: FEATURE,
    author: user.id,
    dueDate: '',
    assignedTo: user.id
  })

  useEffect(() => {
    //getProjects
    axios
      .get(PROJECTS_PATH)
      .then(response => {
        setProjects(
          response.data.map(project => ({
            text: `${project.name}`,
            value: project._id
          }))
        )
        
        setPermittedUsers(
          response.data.map(project => ({
            project_name: `${project.name}`,
            project_id: project._id,
            permittedUsers: project.permittedUsers.map(user => ({
              text: `${user.name}`,
              value: user._id
            }))
          }))
        )

        console.log('permittedUsers', permittedUsers)
      })
      .catch(error => {
        console.log(error)
      })
  }, [match])


  console.log('permittedUsers', permittedUsers)
  //currently loads all users
  //later should only load users that are invited to project
  const loadUsersOptions = async () => {
    await axios
      .get(USERS_PATH)
      .then(response => {
        setUserOptions(
          response.data.map(user => ({
            text: `${user.name}`,
            value: user._id
          }))
        )
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    loadUsersOptions()
  }, [task])

  const handleInputChange = (event, { name, value }) => {
    setTask(previousValue => ({ ...previousValue, [name]: value }))
  }

  const handleFormSubmission = () => {
    createTask(task)
    history.push(TASKS_HOME)
  }

  return (
    <Card fluid>
      <Card.Content header='New Task' />
      <Card.Content>
        <Form widths='equal'>
          <Form.Group>
            <Form.Input
              label='Author'
              name='author'
              value={task.author ? user.name : ''}
              error={errors.author}
              disabled
            />
            <Form.Select
              label='Assign To:'
              name='assignedTo'
              options={userOptions}
              value={task.assignedTo ? task.assignedTo : ''}
              error={errors.assignedTo}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label='Title'
              name='title'
              value={task.title}
              onChange={handleInputChange}
              error={errors.title}
            />
            <Form.Select
              label='Project'
              name='project'
              options={projects}
              value={task.project}
              onChange={handleInputChange}
              error={errors.project}
            />
          </Form.Group>
          <Form.Group>
            <Form.Select
              label='Priority'
              name='priority'
              options={PRIORITY_OPTIONS}
              value={task.priority}
              onChange={handleInputChange}
              error={errors.priority}
            />
            <Form.Select
              label='Status'
              name='status'
              options={STATUS_OPTIONS}
              onChange={handleInputChange}
              value={task.status}
              error={errors.status}
            />
          </Form.Group>
          <Form.Group>
            <Form.Select
              label='Type'
              name='type'
              options={TYPE_OPTIONS}
              value={task.type}
              onChange={handleInputChange}
              error={errors.type}
            />
            <SemanticDatepicker
              clearOnSameDateClick
              datePickerOnly
              clearable
              name='dueDate'
              label='Due Date'
              onChange={handleInputChange}
              value={task.dueDate}
              format='MMMM Do YYYY'
            />
          </Form.Group>
          <Form.Group>
            <Form.TextArea
              label='Description'
              name='description'
              value={task.description}
              onChange={handleInputChange}
              rows='12'
              error={errors.description}
            />
          </Form.Group>
        </Form>
      </Card.Content>
      <Card.Content extra>
        <Button
          floated='right'
          color='black'
          content='Cancel'
          onClick={() => history.push(TASKS_HOME)}
        />
        <Button
          floated='right'
          color='green'
          content='Save'
          onClick={handleFormSubmission}
        />
      </Card.Content>
    </Card>
  )
}

Create.propTypes = {
  createTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
})

export default connect(mapStateToProps, { createTask })(Create)
