import React, { useEffect } from 'react'
import { Container, Menu, Card } from 'semantic-ui-react'
import { NavLink, Link, withRouter } from 'react-router-dom'
import { getWorkingLogs } from '../../../actions/workingTimeActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuid from 'uuid'

const Logs = ({
  project: { project },
  workingTime: { workingTime },
  getWorkingLogs,
  match
}) => {
  useEffect(() => {
    getWorkingLogs(match.params._id)
  }, [project])

  let logCards = []
  if (workingTime.logs) {
    logCards = workingTime.logs.map(log => (
      <Card key={uuid.v4()}>
        
        <Card.Content>
        <Card.Meta>
          <Link to={`/profile/${log.userId}`}>{log.userName}</Link>
        </Card.Meta>
        <Card.Meta>{log.minutes} Minutes</Card.Meta>
          <p>{log.description}</p>
        </Card.Content>
      </Card>
    ))
  }

  return (
    <Container fluid>
      <Menu secondary>
        <Menu.Item
          name='Details'
          as={NavLink}
          to={'/projects/details/' + match.params._id}
        />
        <Menu.Item
          name='Kanban'
          as={NavLink}
          to={'/projects/kanban/' + match.params._id}
        />
        <Menu.Item
          name='Logs'
          as={NavLink}
          to={'/projects/logs/' + match.params._id}
        />
      </Menu>
      <Container fluid>{logCards}</Container>
    </Container>
  )
}

Logs.propTypes = {
  project: PropTypes.object.isRequired,
  workingTime: PropTypes.object.isRequired,
  getWorkingLogs: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  project: state.project,
  workingTime: state.workingTime
})

export default withRouter(connect(mapStateToProps, { getWorkingLogs })(Logs))
