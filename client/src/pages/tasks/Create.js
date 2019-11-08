import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Form, Grid, Header} from 'semantic-ui-react'

const Create = () => {
  const [task, setTask] = useState({
    title: '',
    project: '',
    description: '',
    status: '',
    priority: ''
  })

  const [projects, setProjects] = useState([])
  useEffect(() => {
    axios.get('/api/projects/').then(response => {
      setProjects(
        response.data.map(project => ({
          text: `${project.name}`,
          value: project._id
        }))
      )
    })
  }, [])

  const [redirect, setRedirect] = useState(false)

  const handleInputChange = (event, { name, value }) => {
    setTask(previousValue => ({ ...previousValue, [name]: value }));
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

  const handleFormReset = () => {
    setTask({
      title: '',
      project: '',
      description: '',
      status: '',
      priority: ''
    })
  }

  const priorityOptions = [
    {key: 'p1', value: 'low', text: 'low'},
    {key: 'p2', value: 'high', text: 'high'},
    {key: 'p3', value: 'critical', text: 'critical'}
  ]
  const statusOptions = [
    {key: 's1', value: 'backlog', text: 'backlog'},
    {key: 's2', value: 'open', text: 'open'},
    {key: 's3', value: 'in progress', text: 'in progress'},
    {key: 's4', value: 'closed', text: 'closed'}
  ]
  return (
    <>
      {redirect ? (
        <Redirect to='/tasks' push />
      ) : (
        <>
          <Header as='h2'>Create</Header>
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
                value={task.projects}
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
                value={task.status}
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
          <Grid stackable>
            <Grid.Column width={8} textAlign='left'>
              <Button
                color='teal'
                content='Reset'
                onClick={handleFormReset}
              />
            </Grid.Column>
            <Grid.Column width={8} textAlign='right'>
              <Button
                color='red'
                content='Cancel'
                onClick={handleFormCancellation}
              />
              <Button
                color='green'
                content='Save'
                onClick={handleFormSubmission}
              />
            </Grid.Column>
          </Grid>
        </>
      )}
    </>
  )
}

export default Create;
