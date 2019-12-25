import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { registerUser } from '../../actions/authentication'
import { Form, Button, Container, Card } from 'semantic-ui-react'

const Register = ({ registerUser, auth, errors, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirm: ''
  })

  const handleInputChange = (event, { name, value }) => {
    setFormData(formData => ({ ...formData, [name]: value }))
  }

  const { name, email, password, password_confirm } = formData
  const handleSubmit = e => {
    e.preventDefault()
    const user = {
      name,
      email,
      password,
      password_confirm
    }
    registerUser(user, history)
  }

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/')
    }
  }, [auth, history])

  return (
    <Container>
        <Card fluid>
          <Card.Content>
            <Card.Header>Register</Card.Header>
          </Card.Content>
          <Card.Content>
            <Form widths='equal'>
              <Form.Group>
                <Form.Input
                  type='text'
                  placeholder='Name'
                  label='Name'
                  name='name'
                  onChange={handleInputChange}
                  value={name}
                  error={errors.name}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  type='email'
                  placeholder='Email'
                  label='Email'
                  name='email'
                  onChange={handleInputChange}
                  value={email}
                  error={errors.email}
                />
              </Form.Group>
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
                  placeholder="Confirm Password"
                  label='Confirm Password'
                  name='password_confirm'
                  onChange={handleInputChange}
                  value={password_confirm}
                  error={errors.password_confirm}
                />
              </Form.Group>
            </Form>
            <Button color='green' content='Register' onClick={handleSubmit} />
          </Card.Content>
        </Card>
      </Container>
  )
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register))
