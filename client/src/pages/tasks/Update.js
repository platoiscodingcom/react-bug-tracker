import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Container, Form, Header } from 'semantic-ui-react';

const Update = ({ match }) => {
  const [task, setTask] = useState({
    title: '',
    project: '',
    description: '',
    status: '',
    priority: '',
    type: ''
  })
  useEffect(() => {
    axios.get(`/api/tasks/${match.params._id}`).then(response => {
      setTask(response.data)
    })
  }, [match])

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
    setTask(prevValue => ({ ...prevValue, [name]: value }))
  }

  const handleFormSubmission = () => {
    axios
      .put(`/api/tasks/${match.params._id}`, task)
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
  const typeOptions = [
    {key: 't1', value: 'bug', text: 'bug'},
    {key: 't2', value: 'feature', text: 'feature'}
  ]

  return (
    <>
      {redirect ? (
        <Redirect to='/tasks' push />
      ) : (
        <>
          <Header as='h2'>Edit</Header>
          <Form widths='equal'>
            <Form.Group>
              <Form.Input
                label='title'
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
                value={task.status}
                onChange={handleInputChange}
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
          <Container textAlign='right'>
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
          </Container>
        </>
      )}
    </>
  )
}

export default Update;
