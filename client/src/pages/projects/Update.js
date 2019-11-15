import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Container, Form, Header } from 'semantic-ui-react'

const Update = ({ match }) => {
  const [project, setProject] = useState({
    name: '',
    status: '',
    description: '',
    categories: []
  })
  const loadProject = () =>{
    axios.get(`/api/projects/${match.params._id}`).then(response => {
      setProject(response.data)
    })
  }

  const [categoriesOptions, setCategories] = useState([]);
  const loadCategoryOptions = () =>{
    axios.get('/api/categories/').then(response => {
      setCategories(
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
    setProject(prevValue => ({ ...prevValue, [name]: value }))
  }

  const handleFormSubmission = () => {
    axios
      .put(`/api/projects/${match.params._id}`, project)
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

  const statusOptions = [
    {key: 's1', value: 'backlog', text: 'backlog'},
    {key: 's2', value: 'open', text: 'open'},
    {key: 's3', value: 'in progress', text: 'in progress'},
    {key: 's4', value: 'closed', text: 'closed'}
  ]
  const catArray = project.categories.map((cat) => cat._id);
  
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
                  multiple selection
                  search
                  options={categoriesOptions}
                  value={catArray}
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
