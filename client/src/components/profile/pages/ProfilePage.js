import React, { useEffect, useState } from 'react'
import {
  Card,
  List,
  Header,
  Dropdown,
  Menu,
  Grid,
  Container,
  Form,
  Button
} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import useIsMounted from 'ismounted'
import {updateUserInfo} from '../../../actions/userActions'
import { NavLink, withRouter, Link } from 'react-router-dom'

const ProfilePage = ({ auth: { user, loading }, errors, updateUserInfo, history }) => {
 

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    email: ''
  })

  const {bio, name, email} = formData

  //check if it's mounted -> cannot set state on unmounted component
  const isMounted = useIsMounted()
  useEffect(() => {
    //only if loading is false and still mounted
    if (!loading && isMounted.current && user) {
      const {
        name,
        bio,
        email
      } = user
      setFormData({
        name,
        bio,
        email
      })
    }

     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isMounted, loading])

  const handleInputChange = (event, { name, value }) => {
    setFormData(formData => ({ ...formData, [name]: value }))
  }

  const onSubmit = e => {
    e.preventDefault()
    updateUserInfo(user, formData, history)
  }

  return (
    <Card fluid>
      <Card.Content header='Your Profile' />
      <Card.Content>
        <Form widths='equal'>
          <Form.Group>
            <Form.Input
              label='Name'
              name='name'
              value={name ? user.name : ''}
              error={errors.name}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label='Email'
              name='email'
              value={email ? user.email : ''}
              error={errors.email}
            />
          </Form.Group>
          <Form.Group>
            <Form.TextArea
              label='Bio'
              name='bio'
              value={bio}
              onChange={handleInputChange}
              rows='12'
            />
          </Form.Group>
        </Form>
        <Card.Content extra textAlign='right'>
          <Button color='green' content='Save' onClick={e => onSubmit(e)} />
        </Card.Content>
      </Card.Content>
    </Card>
  )
}

ProfilePage.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  updateUserInfo: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default withRouter(connect(mapStateToProps, {updateUserInfo})(ProfilePage))
