import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Card, Button, Form } from 'semantic-ui-react'
import UpdateLoader from '../../components/loader/UpdateLoader'
import { CATEGORIES_HOME, CATEGORIES_PATH } from '../../components/Constants'
import { updateCategory } from '../../actions/categoryActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Update = ({updateCategory, errors, history, match}) => {
  const [category, setCategory] = useState({ name: '' })
  const [redirect, setRedirect] = useState(false)

  const handleInputChange = (event, { name, value }) => {
    setCategory(prevValue => ({ ...prevValue, [name]: value }))
  }

  const handleFormSubmission = () => {
    updateCategory(category, history)
  }

  const handleFormCancellation = () => {
    setRedirect(true)
  }

  useEffect(() =>{
    axios
      .get(`${CATEGORIES_PATH}/${match.params._id}`)
      .then(res => {
        setCategory(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [match])

  if (category == null || category === '') {
    return <UpdateLoader />
  } else {
    return (
      <div>
        {redirect ? (
          <Redirect to={CATEGORIES_HOME} push />
        ) : (
          <Card fluid>
            <Card.Content header={category.name} />
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
}

Update.propTypes = {
  updateCategory: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(mapStateToProps, {updateCategory})(Update)
