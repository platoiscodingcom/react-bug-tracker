import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Button, Form, Card } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers'
import moment from 'moment'
import useIsMounted from 'ismounted'
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css'
import UpdateLoader from '../../loader/UpdateLoader'
import { getProject, updateProject } from './../../../actions/projectActions'
import {
  CATEGORIES_PATH,
  PROJECTS_HOME,
  USERS_PATH,
  STATUS_OPTIONS
} from '../../../Constants'

const Update = ({
  project: { project, loading },
  getProject,
  updateProject,
  errors,
  history,
  match
}) => {
  const [userOptions, setUserOptions] = useState([])
  const [categoryOptions, setCategoryOptions] = useState([])
  const [formData, setFormData] = useState({
    _id: match.params.id,
    name: '',
    categories: [],
    status: '',
    description: '',
    dueDate: '',
    author: '',
    assignedTo: ''
  })
  const newDueDate = null
  const {
    name,
    status,
    description,
    categories,
    dueDate,
    author,
    assignedTo
  } = formData

  useEffect(() => {
    loadUsersOptions()
    loadCategoryOptions()
    getProject(match.params._id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //check if it's mounted -> cannot set state on unmounted component
  const isMounted = useIsMounted()
  useEffect(() => {
    //only if loading is false and still mounted
    if (!loading && isMounted.current && project) {
      const {
        name,
        status,
        description,
        categories,
        dueDate,
        author,
        assignedTo
      } = project
      setFormData({
        name,
        status,
        description,
        categories: categories.map(cat => cat._id),
        dueDate,
        author,
        assignedTo
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

  //currently loads all users
  //later should only load users that are invited to project
  const loadUsersOptions = async () => {
    await axios
      .get(USERS_PATH)
      .then(response => {
        setUserOptions(
          response.data.map(user => ({
            text: `${user.name}`,
            value: user._id
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
              label='Author'
              name='author'
              value={author ? author.name : ''}
              error={errors.author}
              disabled
            />
            <Form.Select
              label='Assign To:'
              name='assignedTo'
              options={userOptions}
              value={assignedTo ? assignedTo._id : ''}
              error={errors.assignedTo}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label='Name'
              name='name'
              value={name}
              onChange={handleInputChange}
              error={errors.name}
            />
            <SemanticDatepicker
              clearable
              name='dueDate'
              label={`Due Date: ${moment(dueDate).format('MMMM Do YYYY')}`}
              onChange={handleInputChange}
              value={newDueDate}
              format='MMMM Do YYYY'
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
            <Form.Select
              label='Status'
              name='status'
              options={STATUS_OPTIONS}
              value={status}
              onChange={handleInputChange}
              error={errors.status}
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
