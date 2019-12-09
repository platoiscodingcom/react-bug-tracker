import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Card, Button, Form } from 'semantic-ui-react'
import UpdateLoader from '../../components/loader/UpdateLoader'
import { CATEGORIES_HOME, CATEGORIES_PATH } from '../../components/Constants'
import { validateNewCategory } from '../../validation/validateCategory'

const Update = ({ match }) => {
  const [category, setCategory] = useState({ name: '' })
  const [redirect, setRedirect] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (event, { name, value }) => {
    setCategory(prevValue => ({ ...prevValue, [name]: value }))
  }

  const handleFormSubmission = () => {
    setErrors(validateNewCategory(category))
    setIsSubmitting(true)
  }

  const handleFormCancellation = () => {
    setRedirect(true)
  }

  useEffect(() =>{
    axios
      .get(`${CATEGORIES_PATH}/${match.params._id}`)
      .then(res => {
        setCategory(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [match])

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        axios
          .put(`${CATEGORIES_PATH}/${match.params._id}`, category)
          .then(() => {
            setRedirect(true)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    [errors, isSubmitting, category, match.params._id]
  )

  if (category == null || category === '') {
    return <UpdateLoader />
  } else {
    return (
      <div>
        {redirect ? (
          <Redirect to={CATEGORIES_HOME} push />
        ) : (
          <Card fluid>
            <Card.Content header={category.name} />
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
}

export default Update
