import React, { useState } from 'react'
import { Card, Button, Form } from 'semantic-ui-react'
import { CATEGORIES_HOME } from '../../components/Constants'
import { createCategory } from '../../actions/categoryActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Create = ({createCategory, errors, history}) => {
  const [category, setCategory] = useState({ name: '' })

  const handleInputChange = (event, { name, value }) => {
    setCategory(previousValue => ({ ...previousValue, [name]: value }))
  }

  const handleFormSubmission = () => {
    createCategory(category, history)
  }

  return (
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
              onClick={e => history.push(CATEGORIES_HOME)}
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
  createCategory: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(mapStateToProps, { createCategory })(Create)
