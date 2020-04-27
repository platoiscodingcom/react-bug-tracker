import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Button, Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import UpdateLoader from '../../loader/UpdateLoader'
import SemanticDatepicker from 'react-semantic-ui-datepickers'
import moment from 'moment'
import {
  PROJECTS_PATH,
  TASKS_HOME,
  TYPE_OPTIONS,
  STATUS_OPTIONS,
  PRIORITY_OPTIONS
} from '../../../Constants'
import { getTask, updateTask } from './../../../actions/taskActions'
import useIsMounted from 'ismounted'

const Update = ({
  errors,
  match,
  getTask,
  updateTask,
  task: { task, loading },
  history
}) => {
  const [userOptions, setUserOptions] = useState([])
  const [projects, setProjects] = useState([])
  const [permittedUsersOfProjects, setPermittedUsersOfProjects] = useState([])
  const [formData, setFormData] = useState({
    _id: match.params.id,
    title: '',
    project: '',
    description: '',
    status: '',
    priority: '',
    type: '',
    dueDate: '',
    author: '',
    assignedTo: ''
  })

  const newDueDate = null
  const {
    title,
    status,
    description,
    type,
    priority,
    project,
    dueDate,
    author,
    assignedTo
  } = formData

  useEffect(() => {
    loadProjects()
    getTask(match.params._id, history)
  }, [])

  const isMounted = useIsMounted()
  useEffect(() => {

    if (!loading && isMounted.current && task) {

      permittedUsersOfProjects.filter(permit => {
        if (permit.project_id === task.project._id) {
          setUserOptions(permit.permittedUsers)
        }
      })

      const {
        title,
        status,
        description,
        type,
        priority,
        project,
        dueDate,
        author,
        assignedTo
      } = task
      setFormData({
        title,
        status,
        description,
        type,
        dueDate,
        priority,
        project,
        author,
        assignedTo
      })
    }
  }, [task, isMounted, loading])

  const loadProjects = async () => {
    await axios
      .get(PROJECTS_PATH)
      .then(response => {
        setProjects(
          response.data.map(project => ({
            text: `${project.name}`,
            value: project._id
          }))
        )

        setPermittedUsersOfProjects(
          response.data.map(project => ({
            project_id: project._id,
            permittedUsers: project.permittedUsers.map(user => ({
              text: `${user.name}`,
              value: user._id
            }))
          }))
        )
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleInputChange = (event, { name, value }) => {
    setFormData(formData => ({ ...formData, [name]: value }))
    if (name === 'project') {
      permittedUsersOfProjects.filter(permit => {
        if (permit.project_id === value) {
          setUserOptions(permit.permittedUsers)
        }
      })
    }
  }

  const onSubmit = e => {
    e.preventDefault()
    updateTask(task, formData, history)
  }

  if (task == null || task === '') return <UpdateLoader />

  return (
    <Card fluid>
      <Card.Content header={task.title} />
      <Card.Content>
        <Form widths='equal'>
          <Form.Group>
            <Form.Input
              label='Author'
              name='author'
              value={author ? author.name : ''}
              error={errors.author}
              disabled
            />

            <Form.Input
              label='Title'
              name='title'
              value={title}
              onChange={handleInputChange}
              error={errors.title}
            />
          </Form.Group>
          <Form.Group>
            <Form.Select
              label='Project'
              name='project'
              options={projects}
              value={project._id}
              onChange={handleInputChange}
              error={errors.project}
            />
            <Form.Select
              label='Assign To:'
              name='assignedTo'
              options={userOptions}
              value={assignedTo._id}
              error={errors.assignedTo}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Select
              label='Priority'
              name='priority'
              options={PRIORITY_OPTIONS}
              value={priority}
              onChange={handleInputChange}
              error={errors.priority}
            />
            <Form.Select
              label='Status'
              name='status'
              options={STATUS_OPTIONS}
              value={status}
              onChange={handleInputChange}
              error={errors.status}
            />
          </Form.Group>
          <Form.Group>
            <Form.Select
              label='Type'
              name='type'
              options={TYPE_OPTIONS}
              value={type}
              onChange={handleInputChange}
              error={errors.type}
            />
            <SemanticDatepicker
              clearable
              name='dueDate'
              label={`Due Date: ${moment(dueDate).format('MMMM Do YYYY')}`}
              onChange={handleInputChange}
              value={newDueDate ? newDueDate : ''}
              format='MMMM Do YYYY'
            />
          </Form.Group>
          <Form.Group>
            <Form.TextArea
              label='Description'
              name='description'
              value={description}
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
          onClick={e => onSubmit(e)}
        />
      </Card.Content>
    </Card>
  )
}

Update.propTypes = {
  updateTask: PropTypes.func.isRequired,
  getTask: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  task: state.task
})

export default connect(mapStateToProps, { updateTask, getTask })(
  withRouter(Update)
)
