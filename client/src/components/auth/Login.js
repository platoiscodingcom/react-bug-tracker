import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loginUser } from '../../actions/authentication'
import { Form, Button, Container, Header } from 'semantic-ui-react'

const Login = ({ loginUser, errors, history, auth }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (event, { name, value }) => {
    setFormData(formData => ({ ...formData, [name]: value }))
  }

  const { email, password } = formData
  const handleSubmit = e => {
    e.preventDefault()
    const user = {
      email,
      password
    }
    loginUser(user)
  }

  const handleAdminLogin = e => {
    e.preventDefault()
    const admin = {
      email: 'admin@gmail.com',
      password: 'password'
    }
    loginUser(admin)
  }

  const handleModLogin = e => {
    e.preventDefault()
    const moderator = {
      email: 'moderator@gmail.com',
      password: 'password'
    }
    loginUser(moderator)
  }

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/projects')
    }
  }, [auth, history])

  //reset errors when switching to another page
  useEffect(() => {
    if (errors.email || errors.password) {
      errors.email = null
      errors.password = null
    }
  }, [errors])

  return (
    <Container>
      <Header as='h1'>Login</Header>
      <Form widths='equal'>
        <Form.Group>
          <Form.Input
            type='email'
            placeholder='Email'
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
            name='password'
            onChange={handleInputChange}
            value={password}
            error={errors.password}
          />
        </Form.Group>
      </Form>
      
        <Button
          className='loginbutton'
          color='green'
          content='Login'
          onClick={handleSubmit}
        />
        <Container className="sppecbuttncontainer">
        <Button
          color='blue'
          content='Login as Admin'
          onClick={handleAdminLogin}
          className='specbutton'
        />
        <Button
          color='blue'
          content='Login as Moderator'
          onClick={handleModLogin}
          className='specbutton'
        />
      </Container>
      <div className="forgotPassword">
      <a href='/forgotpassword'>Forgot Password</a>
    </div>
      
    </Container>
  )
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default withRouter(connect(mapStateToProps, { loginUser })(Login))
