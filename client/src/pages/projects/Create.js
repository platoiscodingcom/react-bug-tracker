import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Card, Button, Form } from 'semantic-ui-react'
import { statusOptions } from '../../components/helper/MultipleSelect'
import { validateProject } from '../../validation/validateProject'
import { errorsEmpty } from '../../validation/validationFunctions'
import {
  OPEN,
  PROJECTS_PATH,
  CATEGORIES_PATH,
  PROJECTS_HOME
} from '../../components/Constants'

const Create = () => {
  const [project, setProject] = useState({
    name: '',
    status: OPEN,
    description: '',
    categories: []
  })
  const [redirect, setRedirect] = useState(false)
  const [categories, setCategories] = useState([])
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (event, { name, value }) => {
    setProject(previousValue => ({ ...previousValue, [name]: value }))
  }

  const handleFormSubmission = () => {
    setErrors(validateProject(project))
    setIsSubmitting(true)
  }

  const handleFormCancellation = () => {
    setRedirect(true)
  }

  useEffect(
    () => {
      if (errorsEmpty(Object.values(errors)) && isSubmitting) {
        axios
          .post(PROJECTS_PATH, project)
          .then(() => {
            setRedirect(true)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    [errors, isSubmitting, project]
  )

  useEffect(() => {
    axios
      .get(CATEGORIES_PATH)
      .then(response => {
        setCategories(
          response.data.map(category => ({
            text: `${category.name}`,
            value: category._id
          }))
        )
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <>
      {redirect ? (
        <Redirect to={PROJECTS_HOME} push />
      ) : (
        <>
          <Card fluid>
            <Card.Content header='New Project' />
            <Card.Content>
              <Form widths='equal'>
                <Form.Group>
                  <Form.Input
                    label='Name'
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
                  <Form.Select
                    label='Categories'
                    name='categories'
                    fluid
                    multiple
                    selection
                    search
                    options={categories}
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

export default Create
