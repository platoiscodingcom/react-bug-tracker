import axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Grid, Header } from 'semantic-ui-react';

const Create = () => {
  const [project, setProject] = useState({
    name: ''
  })

  const [redirect, setRedirect] = useState(false)

  const handleInputChange = (event, { name, value }) => {
    setProject(previousValue => ({ ...previousValue, [name]: value }))
  }

  const handleFormSubmission = () => {
    axios
      .post('/api/projects', project)
      .then(() => {
        setRedirect(true)
      })
      .catch(() => {
        alert('Error occured when handeling submission');
        console.log('My project : ' + project)
      })
  }

  const handleFormCancellation = () => {
    setRedirect(true)
  }

  return (
    <>
      {redirect ? (
        <Redirect to='/projects' push />
      ) : (
        <>
          <Header as='h2'>Create</Header>
          <Form widths='equal'>
            <Form.Group>
              <Form.Input
                label='name'
                name='name'
                value={project.name}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
          <Grid stackable>
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
