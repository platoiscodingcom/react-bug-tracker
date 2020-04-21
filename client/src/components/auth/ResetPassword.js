import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Card } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { resetPassword, logoutUser } from '../../actions/authentication'

const ResetPassword = ({ match,errors, history, resetPassword, auth }) => {
  const [formData, setFormData] = useState({
    password: '',
    password_confirm: ''
  })

  const handleInputChange = (event, { name, value }) => {
    setFormData(formData => ({ ...formData, [name]: value }))
  }

  const { password, password_confirm } = formData
  const handleSubmit = e => {
    e.preventDefault()
    const user = {
      password,
      password_confirm
    }
    console.log('token', match.params.token)
    resetPassword(user, match.params.token, history)
  }

  //reset errors when switching to another page
  
  useEffect(() => {
    if (errors.password || errors.password_confirm) {
      errors.password = null
      errors.password_confirm = null
    }
  }, [errors])

  
  useEffect(() => {
    if (auth.isAuthenticated) {
      logoutUser(history)
    }
  }, [auth, history])

  return(
    <Container>
      <Card fluid>
        <Card.Content>
          <Card.Header>choose a new password</Card.Header>
        </Card.Content>
        <Card.Content>
          <Form widths='equal'>
            <Form.Group>
              <Form.Input
                type='password'
                placeholder='Password'
                label='Password'
                name='password'
                onChange={handleInputChange}
                value={password}
                error={errors.password}
              />
              <Form.Input
                type='password'
                placeholder='Confirm Password'
                label='Confirm Password'
                name='password_confirm'
                onChange={handleInputChange}
                value={password_confirm}
                error={errors.password_confirm}
              />
            </Form.Group>
          </Form>
          <Button
            color='green'
            content='Reset Password'
            onClick={handleSubmit}
          />
        </Card.Content>
      </Card>
    </Container>
  )
}

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default withRouter(
  connect(mapStateToProps, { resetPassword, logoutUser})(ResetPassword)
)
