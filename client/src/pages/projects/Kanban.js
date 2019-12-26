import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { getProject } from '../../actions/projectActions'
import { Card, Button, Divider, Grid } from 'semantic-ui-react'

const Kanban = ({ project: { project }, match, history }) => {
  useEffect(() => {
    getProject(match.params._id, history)
  }, [getProject, match, history])

  return (
    <Grid>
      <Grid.Row columns={3}>
        <Grid.Column>
          <Card>
            <Card.Content>
              <Card.Header>Status</Card.Header>
            </Card.Content>
            <Card.Content>
              <Card>
                <Card.Content>
                  <Card.Header>Name of Task</Card.Header>
                </Card.Content>
                <Card.Content>Content</Card.Content>
              </Card>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

Kanban.propTypes = {
  project: PropTypes.object.isRequired,
  getProject: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  project: state.project
})

export default withRouter(connect(mapStateToProps, { getProject })(Kanban))
