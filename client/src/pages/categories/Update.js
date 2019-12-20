import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Card, Button, Form } from 'semantic-ui-react'
import UpdateLoader from '../../components/loader/UpdateLoader'
import { CATEGORIES_HOME } from '../../components/Constants'
import { updateCategory, getCategory } from '../../actions/categoryActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Update = ({
  category: { category },
  getCategory,
  updateCategory,
  errors,
  history,
  match
}) => {
  const [formData, setFormData] = useState({
    name: ''
  })

  useEffect(() => {
    getCategory(match.params._id, history)
    setFormData({
      name: '' || !category.name ? '' : category.name
    })
  }, [getCategory, match.params._id]) 

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    console.log('onSubmit', formData)
    updateCategory(category, formData, history)
  }
  if (category == null || category === '') return <UpdateLoader />
  return (
    <Card fluid>
      <Card.Content header={category.name} />
      <Card.Content>
        <Form widths='equal'>
          <Form.Group>
            <Form.Input
              label='name'
              name='name'
              value={formData.name}
              onChange={e => onChange(e)}
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
          onClick={() => {return <Redirect to={CATEGORIES_HOME} push />}}
        />
        <Button
          floated='right'
          color='green'
          content='Save'
          type='submit'
          onClick={e => onSubmit(e)}
        />
      </Card.Content>
    </Card>
  )
}

Update.propTypes = {
  updateCategory: PropTypes.func.isRequired,
  getCategory: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  category: state.category
})

export default connect(mapStateToProps, { updateCategory, getCategory })(Update)
