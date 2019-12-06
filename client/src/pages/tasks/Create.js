import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Card, Button, Form } from 'semantic-ui-react'
import {
  statusOptions,
  priorityOptions,
  typeOptions
} from '../../components/helper/MultipleSelect'

const Create = ({ match }) => {
  const [task, setTask] = useState({
    title: '',
    project: '',
    description: '',
    status: '',
    priority: '',
    type: ''
  })

  const [projects, setProjects] = useState([])
  useEffect(
    () => {
      axios.get('/api/projects/').then(response => {
        setProjects(
          response.data.map(project => ({
            text: `${project.name}`,
            value: project._id
          }))
        )
      })
    },
    [match]
  )

  const [redirect, setRedirect] = useState(false)

  const handleInputChange = (event, { name, value }) => {
    setTask(previousValue => ({ ...previousValue, [name]: value }))
  }

  const handleFormSubmission = () => {
    axios
      .post('/api/tasks', task)
      .then(() => {
        setRedirect(true)
      })
      .catch(() => {
        alert('Error occured')
      })
  }

  const handleFormCancellation = () => {
    setRedirect(true)
  }

  return (
    <>
      {redirect ? (
        <Redirect to='/tasks' push />
      ) : (
        <>
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
                  />
                  <Form.Select
                    label='Project'
                    name='project'
                    options={projects}
                    value={task.project}
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
                    rows='12'
                  />
                </Form.Group>
              </Form>
            </Card.Content>
            <Card.Content extra>
              <Button
                floated='right'
                color='black'
                content='Cancel'
                onClick={handleFormCancellation}
              />
              <Button
                floated='right'
                color='green'
                content='Save'
                onClick={handleFormSubmission}
              />
            </Card.Content>
          </Card>
        </>
      )}
    </>
  )
}

export default Create
