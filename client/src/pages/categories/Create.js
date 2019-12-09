import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Card, Button, Form } from 'semantic-ui-react'
import { CATEGORIES_HOME, CATEGORIES_PATH } from '../../components/Constants'
import { validateNewCategory } from '../../validation/validateCategory'

const Create = () => {
  const [category, setCategory] = useState({ name: '' })
  const [redirect, setRedirect] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (event, { name, value }) => {
    setCategory(previousValue => ({ ...previousValue, [name]: value }))
  }

  const handleFormSubmission = () => {
    setErrors(validateNewCategory(category))
    setIsSubmitting(true)
  }

  const handleFormCancellation = () => {
    setRedirect(true)
  }

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        axios
          .post(CATEGORIES_PATH, category)
          .then(() => {
            setRedirect(true)
          })
          .catch(error => {
            console.log(error)
          })
      }
    }, [errors, isSubmitting, category]
  )

  return (
    <div>
      {redirect ? (
        <Redirect to={CATEGORIES_HOME} push />
      ) : (
        <Card fluid>
          <Card.Content header='New Category' />
          <Card.Content>
            <Form widths='equal'>
              <Form.Group>
                <Form.Input
                  label='name'
                  name='name'
                  value={category.name}
                  onChange={handleInputChange}
                  error={errors.name}
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
      )}
    </div>
  )
}

export default Create
