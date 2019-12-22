import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Button, Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createTask } from '../../actions/taskActions'
import {
  statusOptions,
  priorityOptions,
  typeOptions
} from '../../components/helper/MultipleSelect'
import {
  OPEN,
  FEATURE,
  LOW,
  PROJECTS_PATH,
  TASKS_HOME
} from '../../components/Constants'

const Create = ({ createTask, errors, history, match }) => {
  const [projects, setProjects] = useState([])
  const [task, setTask] = useState({
    title: '',
    project: '',
    description: '',
    status: OPEN,
    priority: LOW,
    type: FEATURE
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
      })
      .catch(error => {
        console.log(error)
      })
  }, [match])

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
              options={priorityOptions}
              value={task.priority}
              onChange={handleInputChange}
              error={errors.priority}
            />
            <Form.Select
              label='Status'
              name='status'
              options={statusOptions}
              onChange={handleInputChange}
              value={task.status}
              error={errors.status}
            />
            <Form.Select
              label='Type'
              name='type'
              options={typeOptions}
              value={task.type}
              onChange={handleInputChange}
              error={errors.type}
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
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(mapStateToProps, {createTask})(Create)
