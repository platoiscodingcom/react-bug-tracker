import React, { useState, useEffect } from 'react'
import { Card, Image } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

const PermittedUsers = ({}) => {
  return (
    <Card fluid style={{ marginTop: '15px' }}>
      <Card.Content>
        <Card.Header>Permitted Users</Card.Header>
      </Card.Content>

      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
        />
        <Card.Header>Steve Sanders</Card.Header>
        <Card.Meta>Friends of Elliot</Card.Meta>
      </Card.Content>
    </Card>
  )
}

PermittedUsers.propTypes = {
  /*
  project: PropTypes.object.isRequired,
  activity: PropTypes.object.isRequired,
  getActivityByProject: PropTypes.func.isRequired*/
}

const mapStateToProps = state => ({
  //activity: state.activity,
})

export default withRouter(connect(mapStateToProps, {})(PermittedUsers))
