import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Button, Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UpdateLoader from '../../loader/UpdateLoader'
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
  const [projects, setProjects] = useState([])
  const [formData, setFormData] = useState({
    _id: match.params.id,
    title: '',
    project: '',
    description: '',
    status: '',
    priority: '',
    type: ''
  })

  const { title, status, description, type, priority, project } = formData

  useEffect(() => {
    loadProjects()
    getTask(match.params._id, history)
    // eslint-disable-next-line
  }, [])

  //check if it's mounted -> cannot set state on unmounted component
  const isMounted = useIsMounted()
  useEffect(() => {
    //only if loading is false and still mounted
    if (!loading && isMounted.current && task) {
      const { title, status, description, type, priority, project } = task
      setFormData({
        title,
        status,
        description,
        type,
        priority,
        project
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
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleInputChange = (event, { name, value }) => {
    setFormData(formData => ({ ...formData, [name]: value }))
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
            <Form.Select
              label='Type'
              name='type'
              options={TYPE_OPTIONS}
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
