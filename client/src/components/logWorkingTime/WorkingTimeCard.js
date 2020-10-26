import React, { useEffect, useState } from 'react'
import { Card } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import uuid from 'uuid'
import { HorizontalBar } from 'react-chartjs-2'
import { TASK, PROJECT } from '../../Constants'
import {
  getWorkingTimeForTask,
  getWorkingTimeForProject
} from '../../actions/workingTimeActions'

const WorkingTimeCard = ({
  type,
  task: { task },
  project: { project },
  getWorkingTimeForProject,
  getWorkingTimeForTask,
  workingTime: {workingTime}
}) => {
  useEffect(() => {
    if (type === PROJECT) {
      if (project) getWorkingTimeForProject(project._id)
    } else if (type === TASK) {
      if (task) getWorkingTimeForTask(task._id)
    }
  }, [])

  const data = {
    labels: ['Estimated', 'Remaining', 'Logged'],
    datasets: [
      {
        backgroundColor: 'rgba(101, 182, 69, 0.7)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [workingTime.estimated, workingTime.remaining, workingTime.logged]
      }
    ]
  }

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>Working Time</Card.Header>
        <Card.Meta>(in minutes)</Card.Meta>
      </Card.Content>
      <Card.Content key={uuid.v4()}>
        <Card.Content>
          <HorizontalBar data={data} />
        </Card.Content>
      </Card.Content>
    </Card>
  )
}

WorkingTimeCard.propTypes = {
  project: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
  workingTime: PropTypes.object.isRequired,
  getWorkingTimeForTask: PropTypes.func.isRequired,
  getWorkingTimeForProject: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  project: state.project,
  task: state.project,
  workingTime: state.workingTime
})

export default withRouter(
  connect(mapStateToProps, { getWorkingTimeForTask, getWorkingTimeForProject })(
    WorkingTimeCard
  )
)
