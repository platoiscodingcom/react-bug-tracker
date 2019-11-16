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
  const [categoryValues, setCategoryValues] = useState([])
  const loadProject = () =>{
    axios.get(`/api/projects/${match.params._id}`).then(response => {
      setProject(response.data)
      setCategoryValues(response.data.categories)
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
    console.log('categoryOptions: ', categoryOptions);
    convertCategoryValues();
  }, [])

  const [redirect, setRedirect] = useState(false)

  const handleInputChange = (event, { name, value }) => {

    if(name === 'categories'){
      if(categoryValues.includes(value)){
        console.log('trying to pull item from ategoryValues');
       //setCategoryValues(prevValue.filter(item => item !== value));
      }else{
        //push element into Array
        setCategoryValues(prevValue => ({...prevValue, value}));
      }
      console.log('categories after push/pull: ', categoryValues);
    }else{
      setProject(prevValue => ({ ...prevValue, [name]: value }));
    }
    
    console.log('name: ', name);
    console.log('value: ', value);
    
    
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

  
  const convertCategoryValues = () =>{
    console.log('categoryValues in convertCategoryValues: ', categoryValues)
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
                value={categoryValues}
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
