import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Card, Button, Form } from 'semantic-ui-react'
import UpdateLoader from '../../components/loader/UpdateLoader'

const Update = ({ match }) => {
  const [category, setCategory] = useState({
    name: ''
  })

  useEffect(
    () => {
      axios.get(`/api/categories/${match.params._id}`).then(res => {
        setCategory(res.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    [match]
  )

  const [redirect, setRedirect] = useState(false)

  const handleInputChange = (event, { name, value }) => {
    setCategory(prevValue => ({ ...prevValue, [name]: value }))
  }

  const handleFormSubmission = () => {
    axios
      .put(`/api/categories/${match.params._id}`, category)
      .then(() => {
        setRedirect(true)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleFormCancellation = () => {
    setRedirect(true)
  }

  if (category === 'undefined' || category === '') {
    return <UpdateLoader />
  } else {
    return (
      <div>
        {redirect ? (
          <Redirect to='/categories' push />
        ) : (
          <>
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
}

export default Update
