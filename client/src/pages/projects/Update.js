import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Card } from 'semantic-ui-react'
import { statusOptions } from '../../components/helper/MultipleSelect'
import UpdateLoader from '../../components/loader/UpdateLoader'
import { CATEGORIES_PATH, PROJECTS_HOME } from '../../components/Constants'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getProject, updateProject } from './../../actions/projectActions'

const Update = ({
  project: { project, loading },
  getProject,
  updateProject,
  errors,
  history,
  match
}) => {
  const [formData, setFormData] = useState({
    name: '',
    categories: [],
    status: '',
    description: ''
  })
  
  useEffect(() => {
    loadCategoryOptions()
    getProject(match.params._id, history)
    setFormData({
      name: loading || !project.name ? '' : project.name,
      status: loading || !project.status ? '' : project.status,
      description: loading || !project.description ? '' : project.description,
      categories: loading || !project.categories ? [] : project.categories.map(cat => cat._id)
    })// eslint-disable-next-line
  }, [getProject, loading, history, match.params._id])

  const [categoryOptions, setCategoryOptions] = useState([])
  const loadCategoryOptions = () => {
    axios
      .get(CATEGORIES_PATH)
      .then(response => {
        setCategoryOptions(
          response.data.map(category => ({
            text: `${category.name}`,
            value: category._id
          }))
        )
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleInputChange = (event, { name, value }) => {
    setFormData(formData => ({ ...formData, [name]: value }))
  }

  const onSubmit = e => {
    e.preventDefault()
    updateProject(project, formData, history)
  }

  if (project == null || project === '') return <UpdateLoader />

  const {name, status, description, categories} = formData
  return (
    <Container>
      <Card fluid>
        <Card.Content header='Edit' />
        <Card.Content>
          <Form widths='equal'>
            <Form.Group>
              <Form.Input
                label='name'
                name='name'
                value={name}
                onChange={handleInputChange}
                error={errors.name}
              />
              <Form.Select
                label='Status'
                name='status'
                options={statusOptions}
                value={status}
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
                value={categories}
                onChange={handleInputChange}
                error={errors.categories}
              />
            </Form.Group>
            <Form.Group>
              <Form.TextArea
                label='Description'
                name='description'
                value={description}
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
              onClick={() => history.push(PROJECTS_HOME)}
            />
            <Button color='green' content='Save' onClick={e => onSubmit(e)} />
          </Card.Content>
        </Card.Content>
      </Card>
    </Container>
  )
}

Update.propTypes = {
  updateProject: PropTypes.func.isRequired,
  getProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  project: state.project
})

export default connect(mapStateToProps, { updateProject, getProject })(Update)
