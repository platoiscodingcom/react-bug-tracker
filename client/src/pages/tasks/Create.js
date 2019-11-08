import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Form, Grid, Header, TextArea } from 'semantic-ui-react'

const Create = () => {
  const [task, setTask] = useState({
    title: '',
    project: ''
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

  const handleFormReset = () => {
    setTask({
      title: '',
      project: ''
    })
  }

  const priorityOptions = [
    {key: 'low', value: 'low', text: 'low'},
    {key: 'high', value: 'high', text: 'high'},
    {key: 'critical', value: 'critical', text: 'critical'}
  ]
  const statusOptions = [
    {key: 'backlog', value: 'backlog', text: 'backlog'},
    {key: 'open', value: 'open', text: 'open'},
    {key: 'in_progress', value: 'in_progress', text: 'in progress'},
    {key: 'closed', value: 'closed', text: 'closed'}
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
                //value={task.priorities}
                //onChange={handleInputChange}
              />
              <Form.Select
                label='Status'
                name='status'
                options={statusOptions}
                //value={task.status}
                //onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.TextArea 
                label='Description'
                name='description'
                //value={task.description}
                //onChange={handleInputChange}
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
