import React, { useEffect } from 'react'
import { Container, Menu, Card, Grid } from 'semantic-ui-react'
import { NavLink, Link, withRouter } from 'react-router-dom'
import { getWorkingTimeForProject } from '../../../actions/workingTimeActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuid from 'uuid'

const Logs = ({
  project: { project },
  workingTime: { workingTime },
  getWorkingTimeForProject,
  match
}) => {
  useEffect(() => {
    getWorkingTimeForProject(match.params._id)
  }, [project])

  let logCards = []
  if (workingTime.logs) {
    logCards = workingTime.logs.map(log => (
      <Grid.Row>
        <Card fluid key={uuid.v4()}>
          <Card.Content>
            <Card.Meta>
              <Link style = {{color: '#eee'}} to={`/profile/${log.userId}`}>{log.userName}, {log.minutes} Minutes</Link>
            </Card.Meta>
            <Card.Content description={log.description}/>
          </Card.Content>
          
        </Card>
      </Grid.Row>
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
      <Container fluid>
        <Grid>{logCards}</Grid>
      </Container>
    </Container>
  )
}

Logs.propTypes = {
  project: PropTypes.object.isRequired,
  workingTime: PropTypes.object.isRequired,
  getWorkingTimeForProject: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  project: state.project,
  workingTime: state.workingTime
})

export default withRouter(connect(mapStateToProps, { getWorkingTimeForProject })(Logs))
