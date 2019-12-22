import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Form, Card } from 'semantic-ui-react'
import { statusOptions } from '../../components/helper/MultipleSelect'
import UpdateLoader from '../../components/loader/UpdateLoader'
import { CATEGORIES_PATH, PROJECTS_HOME } from '../../components/Constants'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getProject, updateProject } from '../../actions/projectActions'
import useIsMounted from 'ismounted'

const Update = ({
  project: { project, loading },
  getProject,
  updateProject,
  errors,
  history,
  match
}) => {
  const [categoryOptions, setCategoryOptions] = useState([])
  const [formData, setFormData] = useState({
    _id: match.params.id,
    name: '',
    categories: [],
    status: '',
    description: ''
  })
  const { name, status, description, categories } = formData

  useEffect(() => {
    loadCategoryOptions()
    getProject(match.params._id, history)
    // eslint-disable-next-line
  }, [])

  //check if it's mounted -> cannot set state on unmounted component
  const isMounted = useIsMounted()
  useEffect(() => {
    //only if loading is false and still mounted
    if (!loading && isMounted.current && project) {
      const { name, status, description, categories } = project
      setFormData({
        name,
        status,
        description,
        categories: categories.map(cat => cat._id)
      })
    }
  }, [project, isMounted, loading])

  const loadCategoryOptions = async () => {
    await axios
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

  return (
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

export default connect(mapStateToProps, { updateProject, getProject })(
  withRouter(Update)
)
