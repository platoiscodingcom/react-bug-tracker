import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Feed, Card, Container } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { getActivityByProject } from './../../actions/activityActions'
import SingleActivity from './SingleActivity'

const Activity = ({
  activity: { activities },
  getActivityByProject,
  project: { project }
}) => {

  useEffect(() => {
    if (project._id) getActivityByProject(project._id)
  }, [project])

  return (
    <Container fluid style={{ marginTop: '15px' }}>
      <Card>
        <Card.Content>
          <Card.Header>Recent Activity</Card.Header>
        </Card.Content>
        <Card.Content>
          <Feed>
            {activities.map(act => (
              <SingleActivity activity={act} />
            ))}
          </Feed>
        </Card.Content>
      </Card>
    </Container>
  )
}

Activity.propTypes = {
  project: PropTypes.object.isRequired,
  activity: PropTypes.object.isRequired,
  getActivityByProject: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  activity: state.activity,
  project: state.project
})

export default withRouter(
  connect(mapStateToProps, { getActivityByProject })(Activity)
)
