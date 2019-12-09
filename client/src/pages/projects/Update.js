import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Container, Form, Card } from 'semantic-ui-react'
import { statusOptions } from '../../components/helper/MultipleSelect'
import UpdateLoader from '../../components/loader/UpdateLoader'
import { validateProject } from '../../validation/validateProject'
import {errorsEmpty} from '../../validation/validationFunctions'
import {
  PROJECTS_PATH,
  CATEGORIES_PATH,
  PROJECTS_DETAILS
} from '../../components/Constants'

const Update = ({ match }) => {
  const [project, setProject] = useState({
    name: '',
    status: '',
    description: '',
    categories: []
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [categoryOptions, setCategoryOptions] = useState([])
  const loadCategoryOptions = () => {
    axios.get(CATEGORIES_PATH).then(response => {
      setCategoryOptions(
        response.data.map(category => ({
          text: `${category.name}`,
          value: category._id
        }))
      )
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(
    () => {
      // loadProject
      axios.get(`${PROJECTS_PATH}/${match.params._id}`).then(response => {
        setProject({
          name: response.data.name,
          status: response.data.status,
          description: response.data.description,
          categories: response.data.categories.map(cat => cat._id)
        })
      })

      // get available Categories
      loadCategoryOptions()
    },
    [match]
  )

  const [redirect, setRedirect] = useState(false)

  const handleInputChange = (event, { name, value }) => {
    setProject(previousValue => ({ ...previousValue, [name]: value }))
  }

  const handleFormSubmission = () => {
    setErrors(validateProject(project))
    setIsSubmitting(true)
  }

  useEffect(() =>{
    if (errorsEmpty(Object.values(errors)) && isSubmitting) {
      axios
      .put(`${PROJECTS_PATH}/${match.params._id}`, project)
      .then(() => {
        setRedirect(true)
      })
      .catch((error) => {
        console.log(error)
      })
    }

  }, [errors, isSubmitting, project])

  const handleFormCancellation = () => {
    setRedirect(true)
  }

  if (project == null || project === '') {
    return <UpdateLoader />
  } else {
    return (
      <>
        {redirect ? (
          <Redirect to={`${PROJECTS_DETAILS}/${match.params._id}`} push />
        ) : (
          <Container>
            <Card fluid>
              <Card.Content header='Edit' />
              <Card.Content>
                <Form widths='equal'>
                  <Form.Group>
                    <Form.Input
                      label='name'
                      name='name'
                      value={project.name}
                      onChange={handleInputChange}
                      error={errors.name}
                    />
                    <Form.Select
                      label='Status'
                      name='status'
                      options={statusOptions}
                      value={project.status}
                      onChange={handleInputChange}
                      error={errors.status}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Select
                      label='Categories'
                      name='categories'
                      fluid
                      multiple
                      selection
                      search
                      options={categoryOptions}
                      value={project.categories}
                      onChange={handleInputChange}
                      error={errors.categories}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.TextArea
                      label='Description'
                      name='description'
                      value={project.description}
                      onChange={handleInputChange}
                      rows='12'
                      error={errors.description}
                    />
                  </Form.Group>
                </Form>
                <Card.Content extra textAlign='right'>
                  <Button
                    color='black'
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
    )
  }
}

export default Update