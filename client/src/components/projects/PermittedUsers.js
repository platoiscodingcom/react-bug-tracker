import React, { useState } from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import uuid from 'uuid'

const PermittedUsers = ({ project: { project } }) => {
  let permittedUsersCards = []
  if (project.permittedUsers) {
    permittedUsersCards = project.permittedUsers.map(user => (
      <Card.Content key={uuid.v4()}>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
        />
        <Card.Header>{user.name}</Card.Header>
        <Card.Meta>Friends of Elliot</Card.Meta>
      </Card.Content>
    ))
  }

  return (
    <Card fluid style={{ marginTop: '15px' }}>
      <Card.Content>
        <Card.Header>Permitted Users</Card.Header>
      </Card.Content>
      {permittedUsersCards}
    </Card>
  )
}

PermittedUsers.propTypes = {
  project: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  project: state.project
})

export default withRouter(connect(mapStateToProps, {})(PermittedUsers))
