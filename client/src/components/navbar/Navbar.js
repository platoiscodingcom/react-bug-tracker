import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authentication'
import { NavLink, withRouter } from 'react-router-dom'
import { Menu, Segment, Icon } from 'semantic-ui-react'
import LeftSideBar from './LeftSideBar/index'

export const Navbar = ({ logoutUser, history, auth }) => {
  //Burger Menu
  const [openLeftSideBar, setOpenLeftSideBar] = useState(false)

  const onLogout = e => {
    e.preventDefault()
    setOpenLeftSideBar(false)
    logoutUser(history)
  }

  const authLinks = (
    <Menu as='nav' inverted secondary>
      <Menu.Item
        onClick={() =>
          setOpenLeftSideBar(openLeftSideBar === true ? false : true)
        }
      >
        <Icon disabled name='content' size='large' />
      </Menu.Item>

      <Menu.Menu position='right'>
        <Menu.Item as={NavLink} to='/messages' name='Messages'>
          <Icon name='envelope' size='large' />
          Messages
        </Menu.Item>
        <Menu.Item as={NavLink} to='/profile' name='Settings'>
          <Icon name='user' size='large' />
          Profile
        </Menu.Item>
        <Menu.Item as={NavLink} to='/settings' name='Settings'>
          <Icon name='cog' size='large' />
          Settings
        </Menu.Item>
        <Menu.Item name='logout' onClick={onLogout} />
      </Menu.Menu>
    </Menu>
  )

  const guestLinks = (
    <Menu as='nav' inverted secondary>
      <Menu.Item as={NavLink} to='/register' name='Sign Up' />
      <Menu.Item as={NavLink} to='/login' name='Sign In' />
    </Menu>
  )

  const { isAuthenticated } = auth

  return (
    <div>
      {isAuthenticated && authLinks && (
        <div>
          <Segment color={'green'} inverted>
            {authLinks}
          </Segment>
          <LeftSideBar
            openLeftSideBar={openLeftSideBar}
            setOpenLeftSideBar={setOpenLeftSideBar}
          />
        </div>
      )}
    </div>
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
