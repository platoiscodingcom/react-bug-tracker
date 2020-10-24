import React from 'react'
import { Card } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import uuid from 'uuid'
import {HorizontalBar} from 'react-chartjs-2';

const WorkingTimeCard = ({}) =>{
  const data = {
    labels: ['Estimated', 'Remaining', 'Logged'],
    datasets: [
      {
        backgroundColor: 'rgba(101, 182, 69, 0.7)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80]
      }
    ]
  };

  return(
    <Card fluid>
      <Card.Content>
        <Card.Header>Working Time</Card.Header>
        <Card.Meta>(in minutes)</Card.Meta>
      </Card.Content>
      <Card.Content key={uuid.v4()}>
        <Card.Content><HorizontalBar data={data} /></Card.Content>
      </Card.Content>
    </Card>
  )
}

WorkingTimeCard.propTypes = {
  project: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  project: state.project,
  task: state.project
})

export default withRouter(connect(mapStateToProps, {})(WorkingTimeCard))