import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authentication'
import { Form, Button, Container, Card } from 'semantic-ui-react'

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  }
  handleInputChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(user)
  }

  componentDidMount () {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/')
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  render () {
    const { errors } = this.state
    return (
      <Container>
        <Card fluid>
          <Card.Content>
            <Card.Header>Login</Card.Header>
          </Card.Content>

          <Card.Content>
            <Form widths='equal'>
              <Form.Group>
                <Form.Input
                  type='email'
                  placeholder='Email'
                  label='email'
                  name='email'
                  onChange={this.handleInputChange}
                  value={this.state.email}
                  error={errors.email}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  type='password'
                  placeholder='Password'
                  label='password'
                  name='password'
                  onChange={this.handleInputChange}
                  value={this.state.password}
                  error={errors.password}
                />
              </Form.Group>
            </Form>
            <Button color='green' content='Login' onClick={this.handleSubmit} />
          </Card.Content>
        </Card>
      </Container>
    )
  }
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

export default connect(mapStateToProps, { loginUser })(Login)
