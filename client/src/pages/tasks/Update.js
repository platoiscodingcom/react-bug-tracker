import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Card, Button, Form } from 'semantic-ui-react';
import { statusOptions, priorityOptions, typeOptions } from '../../components/select';

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
        console.log("do redirect");
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
          <Card.Content header ={task.title} />
          <Card.Content>
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
                value={task.project._id}
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
                rows="12"
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

export default Update;
