import React, { useEffect, useState } from 'react'
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
  const [formData, setFormData] = useState({ name: '' })

  useEffect(() => {
    getCategory(match.params._id, history)
    if(category.name) setFormData({ name: category.name })
  }, [getCategory, category.name, match.params._id, history])

  const onChange = e => {
    e.preventDefault()
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()
    updateCategory(category, formData, history)
  }

  if (category.name == null || category.name === '') return <UpdateLoader />
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
          onClick={e => history.push(CATEGORIES_HOME)}
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
