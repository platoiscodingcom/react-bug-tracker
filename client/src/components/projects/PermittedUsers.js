import React from 'react'
import { Card, Image } from 'semantic-ui-react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import uuid from 'uuid'

const PermittedUsers = ({ project: { project } }) => {
  let permittedUsersCards = []
  const renderUserRole = user => {
    if (project.author._id === user._id) {
      return 'Author'
    }

    if (project.assignedTo._id === user._id) {
      return 'Assignee'
    } else return ''
  }

  if (project.permittedUsers) {
    permittedUsersCards = project.permittedUsers.map(user => (
      <Card.Content key={uuid.v4()}>
        <Image
          circular
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
        />
        <Card.Content>{user.name}</Card.Content>
        <Card.Meta>{renderUserRole(user)}</Card.Meta>
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
