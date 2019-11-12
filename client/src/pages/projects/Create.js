import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Grid, Header } from 'semantic-ui-react';

const Create = () => {
  const [project, setProject] = useState({
    name: '',
    status: '',
    description: '',
    categories: []
  })

  const [redirect, setRedirect] = useState(false);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get('/api/categories/').then(response => {
      setCategories(
        response.data.map(category => ({
          text: `${category.name}`,
          value: category._id
        }))
      )
    })
  }, [])

  const handleInputChange = (event, { name, value }) => {
    setProject(previousValue => ({ ...previousValue, [name]: value }))
  }

  const handleFormSubmission = () => {
    console.log(project);
    axios
      .post('/api/projects', project)
      .then(() => {
        setRedirect(true)
      })
      .catch(() => {
        alert('Error occured when handeling submission');
      })
  }

  const handleFormCancellation = () => {
    setRedirect(true)
  }

  const statusOptions = [
    {key: 's1', value: 'backlog', text: 'backlog'},
    {key: 's2', value: 'open', text: 'open'},
    {key: 's3', value: 'in progress', text: 'in progress'},
    {key: 's4', value: 'closed', text: 'closed'}
  ]

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
                label='Name'
                name='name'
                value={project.name}
                onChange={handleInputChange}
              />
              <Form.Select
                label='Status'
                name='status'
                options={statusOptions}
                value={project.status}
                onChange={handleInputChange}
              />
              <Form.Select
                label='Categories'
                name='categories'
                fluid
                multiple selection
                search
                options={categories}
                value={project.categories}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.TextArea 
                label='Description'
                name='description'
                value={project.description}
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
