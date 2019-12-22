import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Button, Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  statusOptions,
  priorityOptions,
  typeOptions
} from '../../components/helper/MultipleSelect'
import UpdateLoader from '../../components/loader/UpdateLoader'
import { PROJECTS_PATH, TASKS_HOME } from '../../components/Constants'
import { getTask, updateTask } from './../../actions/taskActions'

const Update = ({
  errors,
  match,
  getTask,
  updateTask,
  task: { task, loading },
  history
}) => {
  const [projects, setProjects] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    project: '',
    description: '',
    status: '',
    priority: '',
    type: ''
  })

  const loadProjects = async( ) => {
    await axios
    .get(PROJECTS_PATH)
    .then(response => {
      setProjects(
        response.data.map(project => ({
          text: `${project.name}`,
          value: project._id
        }))
      )
    })
    .catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    loadProjects()
    getTask(match.params._id, history)
    
    setFormData({
      title: loading || !task.title ? '' : task.title,
      status: loading || !task.status ? '' : task.status,
      description: loading || !task.description ? '' : task.description,
      type: loading || !task.type ? '' : task.type,
      priority: loading || !task.priority ? '' : task.priority,
      project: loading || !task.project ? '' : task.project
    })// eslint-disable-next-line
  }, [getTask, loading, match.params._id, history])


  const handleInputChange = (event, { name, value }) => {
    setFormData(formData => ({ ...formData, [name]: value }))
  }

  const onSubmit = e => {
    e.preventDefault()
    updateTask(task, formData, history)
  }

  if (task == null || task === '') return <UpdateLoader />

  const {title, status, description, type, priority, project} = formData

  return (
    <Card fluid>
      <Card.Content header={task.title} />
      <Card.Content>
        <Form widths='equal'>
          <Form.Group>
            <Form.Input
              label='title'
              name='title'
              value={title}
              onChange={handleInputChange}
              error={errors.title}
            />
            <Form.Select
              label='Project'
              name='project'
              options={projects}
              value={project._id}
              onChange={handleInputChange}
              error={errors.project}
            />
          </Form.Group>
          <Form.Group>
            <Form.Select
              label='Priority'
              name='priority'
              options={priorityOptions}
              value={priority}
              onChange={handleInputChange}
              error={errors.priority}
            />
            <Form.Select
              label='Status'
              name='status'
              options={statusOptions}
              value={status}
              onChange={handleInputChange}
              error={errors.status}
            />
            <Form.Select
              label='Type'
              name='type'
              options={typeOptions}
              value={type}
              onChange={handleInputChange}
              error={errors.type}
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

export default connect(mapStateToProps, { updateTask, getTask })(Update)
