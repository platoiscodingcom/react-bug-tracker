import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Card } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { requestPasswordReset } from './../../actions/authentication'

const ForgotPassword = ({ errors, requestPasswordReset, history }) => {
  const [email, setEmail] = useState({ email: '' })

  const handleInputChange = (event, { name, value }) => {
    setEmail(previousValue => ({ ...previousValue, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    requestPasswordReset(email, history)
    console.log('email', email.email)
  }

  useEffect(() => {
    if (errors.email) {
      errors.email = null
    }
  }, [errors])

  return (
    <Container>
      <Card fluid>
        <Card.Content>
          <Card.Header>
            enter your email to request a password reset
          </Card.Header>
        </Card.Content>

        <Card.Content>
          <Form widths='equal'>
            <Form.Group>
              <Form.Input
                type='email'
                placeholder='Email'
                label='email'
                name='email'
                onChange={handleInputChange}
                value={email.email}
                error={errors.email}
              />
            </Form.Group>
          </Form>
          <Button color='green' content='Send' onClick={handleSubmit} />
        </Card.Content>
      </Card>
    </Container>
  )
}

ForgotPassword.propTypes = {
  requestPasswordReset: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default withRouter(
  connect(mapStateToProps, { requestPasswordReset })(ForgotPassword)
)
