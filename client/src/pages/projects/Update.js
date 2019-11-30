import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Container, Form, Header } from 'semantic-ui-react';
import { statusOptions } from '../../components/select';

const Update = ({ match }) => {
  const [project, setProject] = useState({
    name: '',
    status: '',
    description: '',
    categories: []
  })

  const loadProject = () =>{
    axios.get(`/api/projects/${match.params._id}`)
      .then(response => {
        setProject({
          name: response.data.name,
          status: response.data.status,
          description: response.data.description,
          categories: response.data.categories.map(cat => cat._id)
        })
      })
  }

  const [categoryOptions, setCategoryOptions] = useState([]);
  const loadCategoryOptions = () =>{
    axios.get('/api/categories/').then(response => {
      setCategoryOptions(
        response.data.map(category => ({
          text: `${category.name}`,
          value: category._id
        }))
      )
    })
  }
  
  useEffect(() => {
    loadProject();
    loadCategoryOptions();
  }, [match])

  const [redirect, setRedirect] = useState(false)

  const handleInputChange = (event, { name, value }) => {
    setProject(previousValue => ({ ...previousValue, [name]: value }));
  }

  const handleFormSubmission = () => {
    console.log("before redirect");
    axios
      .put(`/api/projects/${match.params._id}`, project)
      .then(() => {
        setRedirect(true)
      })
      .catch(() => {
        console.log("error");
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
        <Container>
          <Header as='h2'>Edit</Header>
          <Form widths='equal'>
            <Form.Group>
              <Form.Input
                label='name'
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
            </Form.Group>
            <Form.Group>
            <Form.Select
                label='Categories'
                name='categories'
                fluid
                multiple selection
                search
                options={categoryOptions}
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
        </Container>
      )}
    </>
  )
}

export default Update;
