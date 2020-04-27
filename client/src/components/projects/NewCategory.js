import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'semantic-ui-react'
import { createCategory } from '../../actions/categoryActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {withRouter } from 'react-router-dom'

const NewCategory = ({
  newCategoryOpen,
  setNewCategoryOpen,
  createCategory,
  errors,
  history
}) => {
  const [category, setCategory] = useState({ name: '' })

  const handleInputChange = (event, { name, value }) => {
    setCategory(previousValue => ({ ...previousValue, [name]: value }))
  }

  const resetForm = () => {
    setCategory({name: ''})
    setNewCategoryOpen(false)
  }


  const [submitting, setSubmitting] = useState(false)
  const handleFormSubmission = () => {
    createCategory(category, history)
    setSubmitting(true)
  }

  useEffect(() => {
    if (!Object.keys(errors).length && submitting) {
      resetForm()
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors])

  return (
      <Modal open={newCategoryOpen} centered>
        <Modal.Header>New Category </Modal.Header>
        <Modal.Content>
          <Form widths='equal'>
            <Form.Group>
              <Form.Input
                label='name'
                name='name'
                value={category.name}
                onChange={handleInputChange}
                error={errors.name}
              />
            </Form.Group>
          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button color='black' onClick={() => resetForm()}>
            Cancel
          </Button>
          <Button color='green' content='Save' onClick={handleFormSubmission} />
        </Modal.Actions>
      </Modal>
  )
}

NewCategory.propTypes = {
  createCategory: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default withRouter(connect(mapStateToProps, { createCategory })(NewCategory))
