import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Form, Button } from 'semantic-ui-react'
import { validateTask } from '../../validation/validateTask'
import { errorsEmpty } from '../../validation/validationFunctions'
import {
  statusOptions,
  priorityOptions,
  typeOptions
} from '../helper/MultipleSelect'
import { OPEN, FEATURE, LOW, TASKS_PATH, PROJECTS_PATH } from '../Constants'

const NewTask = ({
  project,
  setShowNewTask,
  showNewTask,
  setProject,
  match
}) => {
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [task, setTask] = useState({
    title: '',
    project: project._id,
    description: '',
    status: OPEN,
    priority: LOW,
    type: FEATURE
  })

  const handleInputChange = (event, { name, value }) => {
    setTask(previousValue => ({ ...previousValue, [name]: value }))
  }

  const resetForm = () => {
    setTask({
      title: '',
      project: project._id,
      description: '',
      status: OPEN,
      priority: LOW,
      type: FEATURE
    })
    setShowNewTask({ show: !showNewTask.show })
    axios
      .get(`${PROJECTS_PATH}/${match.params._id}`)
      .then(response => {
        setProject(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleFormSubmission = () => {
    setErrors(validateTask(task))
    setIsSubmitting(true)
  }

  useEffect(() => {
    if (errorsEmpty(Object.values(errors)) && isSubmitting) {
      axios
        .post(TASKS_PATH, task)
        .then(() => {
          resetForm()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [errors, isSubmitting])

  return (
    <div>
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
                error={errors.title}
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
                rows='8'
                error={errors.description}
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
