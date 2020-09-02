import React from 'react'
import { Menu, Icon, Sidebar } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const LeftSideBar = ({ setOpenLeftSideBar, openLeftSideBar }) => {
  return (
    <div>

      <Sidebar
        color={'green'}
        as={Menu}
        animation='overlay'
        icon='labeled'
        inverted
        vertical
        visible={openLeftSideBar}
        width='thin'
      >
        <Menu.Item
          onClick={() =>
            setOpenLeftSideBar(openLeftSideBar === true ? false : true)
          }
        >
          <Icon disabled name='content' size='large' />
        </Menu.Item>
        <Menu.Item as={NavLink} to='/dashboard'>
          <Icon name='home' />
          Dashboard
        </Menu.Item>
        <Menu.Item as={NavLink} to='/projects'>
          <Icon name='table' />
          Projects
        </Menu.Item>
        <Menu.Item as={NavLink} to='/tasks'>
          <Icon name='tasks' />
          Tasks
        </Menu.Item>
        <Menu.Item as={NavLink} to='/categories'>
          <Icon name='folder' />
          Categories
        </Menu.Item>
        <Menu.Item as={NavLink} to='/contacts'>
          <Icon name='address book outline' />
          Contacts
        </Menu.Item>
      </Sidebar>
    </div>
  )
}

export default LeftSideBar
