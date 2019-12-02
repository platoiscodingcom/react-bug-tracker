import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Form, Grid, Header} from 'semantic-ui-react';
import { statusOptions, priorityOptions, typeOptions } from '../../components/select';

const Create = ({match}) => {
  const [task, setTask] = useState({
    title: '',
    project: '',
    description: '',
    status: '',
    priority: '',
    type: ''
  })
  /*
  if(match.params.projectId){
    console.log("true");
    setTask({
      title: '',
      project: match.params.projectId,
      description: '',
      status: '',
      priority: '',
      type: ''})
  }*/

  const [projects, setProjects] = useState([])
  useEffect(() => {
    axios.get('/api/projects/').then(response => {
      setProjects(
        response.data.map(project => ({
          text: `${project.name}`,
          value: project._id
        }))
      )
    });
  }, [match])

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
                //value={task.status}
                onChange={handleInputChange}
                defaultValue={"open"}
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
          <Grid stackable>
            <Grid.Column textAlign='right'>
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
