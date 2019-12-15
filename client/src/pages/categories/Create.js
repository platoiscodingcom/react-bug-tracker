import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Card, Button, Form } from 'semantic-ui-react'
import { CATEGORIES_HOME } from '../../components/Constants'
import { createCategory } from '../../actions/categoryActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Create = props => {
  const [category, setCategory] = useState({ name: '' })
  const [redirect, setRedirect] = useState(false)
  const [errors, setErrors] = useState({})

  const handleInputChange = (event, { name, value }) => {
    setCategory(previousValue => ({ ...previousValue, [name]: value }))
  }

  const handleFormSubmission = () => {
    props.createCategory(category, props.history)
  }

  const handleFormCancellation = () => {
    setRedirect(true)
  }

  //äqu for will receiveprops(nextprops)
  useEffect(() => {
    if (props.errors) {
      setErrors(props.errors)
    }
  }, [props.errors])

  return (
    <div>
      {redirect ? (
        <Redirect to={CATEGORIES_HOME} push />
      ) : (
        <Card fluid>
          <Card.Content header='New Category' />
          <Card.Content>
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
      )}
    </div>
  )
}

Create.propTypes = {
  createCategory: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(mapStateToProps, { createCategory })(Create)
