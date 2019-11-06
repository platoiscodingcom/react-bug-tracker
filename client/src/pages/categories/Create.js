import axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Grid, Header } from 'semantic-ui-react';

const Create = () =>{
  const [category, setCategory] = useState({name: ''})
  const [redirect, setRedirect] = useState(false)

  const handleInputChange = (event, {name, value}) => {
    setCategory(previousValue => ({...previousValue, [name]: value}))
  }

  const handleFormSubmission = () =>{
    axios
      .post('/api/categories', category)
      .then(() => {
        setRedirect(true)
      })
      .catch(() =>{
        alert('Error occured when handeling submission');
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
          <Header as='h2'>Create</Header>
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
          <Grid stackable>
            <Grid.Column width={8} textAlign='right'>
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
            </Grid.Column>
          </Grid>
        </>
      )}
    </div>
  );

}

export default Create;