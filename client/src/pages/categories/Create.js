import axios from 'axios'
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Card, Button, Form } from 'semantic-ui-react'

const Create = () => {
  const [category, setCategory] = useState({ name: '' })
  const [redirect, setRedirect] = useState(false)

  const handleInputChange = (event, { name, value }) => {
    setCategory(previousValue => ({ ...previousValue, [name]: value }))
  }

  const handleFormSubmission = () => {
    axios
      .post('/api/categories', category)
      .then(() => {
        setRedirect(true)
      })
      .catch(() => {
        alert('Error occured when handeling submission')
        console.log('My category : ' + category)
      })
  }

  const handleFormCancellation = () => {
    setRedirect(true)
  }

  return (
    <div>
      {redirect ? (
        <Redirect to='/categories' push />
      ) : (
        <>
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
    </div>
  )
}

export default Create
