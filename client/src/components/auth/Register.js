import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { registerUser } from '../../actions/authentication'
import { Form, Button, Container, Card } from 'semantic-ui-react'

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password_confirm: '',
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
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm
    }
    this.props.registerUser(user, this.props.history)
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
                  onChange={this.handleInputChange}
                  value={this.state.name}
                  error={errors.name}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  type='email'
                  placeholder='Email'
                  label='Email'
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
                  label='Password'
                  name='password'
                  onChange={this.handleInputChange}
                  value={this.state.password}
                  error={errors.password}
                />
                <Form.Input
                  type='password'
                  placeholder="Confirm Password"
                  label='Confirm Password'
                  name='password_confirm'
                  onChange={this.handleInputChange}
                  value={this.state.password_confirm}
                  error={errors.password_confirm}
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register))
