import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/authentication'
import { withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Menu, Segment } from 'semantic-ui-react'

export const Navbar = ({ logoutUser, history, auth }) => {
  const onLogout = e => {
    e.preventDefault()
    logoutUser(history)
  }

  const authLinks = (
    <Menu as='nav' inverted secondary>
      <Menu.Item as={NavLink} to='/projects' exact name='projects' />
      <Menu.Item as={NavLink} to='/tasks' exact name='tasks' />
      <Menu.Item as={NavLink} to='/categories' exact name='categories' />
      <Menu.Menu position='right'>
        <Menu.Item  name='logout' onClick={onLogout} />
      </Menu.Menu>
    </Menu>
  )

  const guestLinks = (
    <Menu as='nav' inverted secondary>
      <Menu.Item as={NavLink} to='/register'  name='Sign Up' />
      <Menu.Item as={NavLink} to='/login'  name='Sign In' />
    </Menu>
  )

  const { isAuthenticated } = auth

  return (
    <Segment color={'green'} inverted>
      {isAuthenticated ? authLinks : guestLinks}
    </Segment>
  )
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar))
