import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Container, Form, Card } from 'semantic-ui-react';
import { statusOptions } from '../../components/select';
import UpdateLoader from '../../components/loader/UpdateLoader';

const Update = ({ match }) => {
  const [project, setProject] = useState({
    name: '',
    status: '',
    description: '',
    categories: []
  })

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
    //loadProject
    axios.get(`/api/projects/${match.params._id}`)
      .then(response => {
        setProject({
          name: response.data.name,
          status: response.data.status,
          description: response.data.description,
          categories: response.data.categories.map(cat => cat._id)
        })
      });
    
    //get available Categories
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
        console.log("then redirect");
        setRedirect(true)
      })
      .catch(() => {
        console.log("error");
      })
  }

  const handleFormCancellation = () => {
    setRedirect(true)
  }

  if(project ==="undefined"|| project === ''){
    return <UpdateLoader />
  }else{
  return (
    <>
      {redirect ? (
        <Redirect to={`/projects/details/${match.params._id}`} push />
      ) : (
        <Container>
        <Card fluid>
        <Card.Content header="Edit" />
        <Card.Content>
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
                rows="12"
              />
            </Form.Group>
          </Form>
          <Card.Content extra textAlign='right'>
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
          </Card.Content>
        </Card.Content>
        </Card>
        </Container>
      )}
    </>
  )}
}

export default Update;
