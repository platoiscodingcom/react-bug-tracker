import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Button, Form } from 'semantic-ui-react'
import { statusOptions } from '../../components/helper/MultipleSelect'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createProject } from '../../actions/projectActions'
import {
  OPEN,
  CATEGORIES_PATH,
  PROJECTS_HOME
} from '../../components/Constants'
import SemanticDatepicker from 'react-semantic-ui-datepickers'
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css'

const Create = ({ createProject, errors, history }) => {
  const [categories, setCategories] = useState([])
  const [project, setProject] = useState({
    name: '',
    status: OPEN,
    description: '',
    categories: [],
    dueDate: ''
  })

  const handleInputChange = (event, { name, value }) => {
    setProject(previousValue => ({ ...previousValue, [name]: value }))
  }

  const handleFormSubmission = () => {
    createProject(project, history)
  }

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
            <SemanticDatepicker
              clearOnSameDateClick
              datePickerOnly
              clearable
              name='dueDate'
              label='Due Date'
              onChange={handleInputChange}
              value={project.dueDate}
              format='MMMM Do YYYY'
            />
          </Form.Group>
          <Form.Group>
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
          onClick={() => history.push(PROJECTS_HOME)}
        />
        <Button
          floated='right'
          color='green'
          content='Save'
          onClick={handleFormSubmission}
        />
      </Card.Content>
    </Card>
  )
}

Create.propTypes = {
  createProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(mapStateToProps, { createProject })(Create)
