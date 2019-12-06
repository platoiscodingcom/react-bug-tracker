import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Form, Button } from 'semantic-ui-react'
import {
  statusOptions,
  priorityOptions,
  typeOptions
} from '../helper/MultipleSelect'

const NewTask = ({
  project,
  setShowNewTask,
  showNewTask,
  setProject,
  match
}) => {
  const [task, setTask] = useState({
    title: '',
    project: project._id,
    description: '',
    status: '',
    priority: '',
    type: ''
  })

  const handleInputChange = (event, { name, value }) => {
    setTask(previousValue => ({ ...previousValue, [name]: value }))
  }

  const resetForm = () => {
    setTask({
      title: '',
      project: project._id,
      description: '',
      status: '',
      priority: '',
      type: ''
    })
    setShowNewTask({ show: !showNewTask.show })
    axios.get(`/api/projects/${match.params._id}`).then(response => {
      setProject(response.data)
    })
  }

  const handleFormSubmission = () => {
    axios
      .post('/api/tasks', task)
      .then(() => {
        resetForm()
      })
      .catch(() => {
        alert('Error occured')
      })
  }

  useEffect(() => {}, [])

  return (
    <div textAlign='left'>
      <Card
        fluid
        style={{ boxShadow: 'none', marginTop: '15px', borderRadius: '0' }}
      >
        <Card.Content header='New Task' />

        <Card.Content>
          <Form widths='equal'>
            <Form.Group>
              <Form.Input
                label='Title'
                name='title'
                value={task.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Select
                label='Priority'
                name='priority'
                options={priorityOptions}
                value={task.priority}
                onChange={handleInputChange}
              />
              <Form.Select
                label='Status'
                name='status'
                options={statusOptions}
                onChange={handleInputChange}
                value={task.status}
              />
              <Form.Select
                label='Type'
                name='type'
                options={typeOptions}
                value={task.type}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.TextArea
                label='Description'
                name='description'
                value={task.description}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Card.Content>

        <Card.Content extra>
          <Button
            color='black'
            onClick={() => setShowNewTask({ show: !showNewTask.show })}
          >
            Cancel
          </Button>
          <Button color='green' content='Save' onClick={handleFormSubmission} />
        </Card.Content>
      </Card>
    </div>
  )
}

export default NewTask
