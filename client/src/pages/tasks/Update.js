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
  task: { task },
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

  const loadProjects = () => {
    axios
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
    getTask(match.params._id, history)
    loadProjects()
    if (task) {
      setFormData({
        title: task.title,
        status: task.status,
        description: task.description,
        type: task.type,
        priority: task.priority,
        project: task.project
      })
    }
    console.log('heho')
  }, [getTask, task, match, history])


    

  const onChange = e => {
    e.preventDefault()
    setFormData({ ...formData, [e.target.name]: e.target.value })
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
              label='title'
              name='title'
              value={formData.title}
              onChange={e => onChange(e)}
              error={errors.title}
            />
            <Form.Select
              label='Project'
              name='project'
              options={projects}
              value={formData.project._id}
              onChange={e => onChange(e)}
              error={errors.project}
            />
          </Form.Group>
          <Form.Group>
            <Form.Select
              label='Priority'
              name='priority'
              options={priorityOptions}
              value={formData.priority}
              onChange={e => onChange(e)}
              error={errors.priority}
            />
            <Form.Select
              label='Status'
              name='status'
              options={statusOptions}
              value={formData.status}
              onChange={e => onChange(e)}
              error={errors.status}
            />
            <Form.Select
              label='Type'
              name='type'
              options={typeOptions}
              value={formData.type}
              onChange={e => onChange(e)}
              error={errors.type}
            />
          </Form.Group>
          <Form.Group>
            <Form.TextArea
              label='Description'
              name='description'
              value={formData.description}
              onChange={e => onChange(e)}
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
