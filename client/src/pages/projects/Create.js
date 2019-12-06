import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Card, Button, Form} from 'semantic-ui-react';
import { statusOptions} from '../../components/helper/MultipleSelect';
import {OPEN, PROJECTS_PATH, CATEGORIES_PATH, PROJECTS_HOME} from '../../components/Constants';

const Create = () => {
  const [project, setProject] = useState({
    name: '',
    status: OPEN,
    description: '',
    categories: []
  })

  const [redirect, setRedirect] = useState(false);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get(CATEGORIES_PATH).then(response => {
      setCategories(
        response.data.map(category => ({
          text: `${category.name}`,
          value: category._id
        }))
      )
    })
  }, [])

  const handleInputChange = (event, { name, value }) => {
    setProject(previousValue => ({ ...previousValue, [name]: value }));
    console.log('handle change', {name, value});
  }

  const handleFormSubmission = () => {
    console.log(project);
    axios
      .post(PROJECTS_PATH, project)
      .then(() => {
        setRedirect(true)
      })
      .catch(() => {
        alert('Error occured when handeling submission');
      })
  }

  const handleFormCancellation = () => {
    setRedirect(true)
  }

  return (
    <>
      {redirect ? (
        <Redirect to={PROJECTS_HOME} push />
      ) : (
        <>
        <Card fluid>
          <Card.Content header ="New Project" />
          <Card.Content>
          <Form widths='equal'>
            <Form.Group>
              <Form.Input
                label='Name'
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
              <Form.Select
                label='Categories'
                name='categories'
                fluid
                multiple selection
                search
                options={categories}
                value={project.categories}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.TextArea 
                label='Description'
                name='description'
                value={project.description}
                onChange={handleInputChange}
                rows="12"
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

export default Create;
