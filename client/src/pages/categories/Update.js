import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Container, Form, Header } from 'semantic-ui-react';

const Update = ({match}) =>{
  const [category, setCategory] = useState({
    name: ''
  })

  useEffect(() => {
    axios.get(`/api/categories/${match.params._id}`).then(res =>{
      setCategory(res.data)
    })
  }, [match])

  const [redirect, setRedirect] = useState(false);

  const handleInputChange = (event, { name, value }) => {
    setCategory(prevValue => ({ ...prevValue, [name]: value }))
  }

  const handleFormSubmission = () => {
    axios
      .put(`/api/categories/${match.params._id}`, category)
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

  return (
    <div>
    {redirect ? (
      <Redirect to='/categories' push />
    ) : (
      <>
        <Header as='h2'>Edit</Header>
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
      </>
    )}
  </div>
  );
}

export default Update;