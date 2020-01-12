import React, {userEffect, useState} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Feed, Card, Container } from 'semantic-ui-react'
import { withRouter, Link } from 'react-router-dom'

const Activity = () => {
  return (
    <Container fluid style={{marginTop: '15px'}}>
    <Card>
      <Card.Content>
        <Card.Header>Recent Activity</Card.Header>
      </Card.Content>
      <Card.Content>
        <Feed>
          <Feed.Event>
            <Feed.Label icon='folder open' />
            <Feed.Content>
              <Feed.Date content='1 day ago' />
              <Feed.Summary>
                You added <Link>Jenny Hess</Link> to your <Link>coworker</Link>{' '}
                group.
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>
        </Feed>
      </Card.Content>
    </Card>
    </Container>
  )
}

Activity.propTypes = {
  project: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  project: state.project
})

export default withRouter(connect(mapStateToProps, {})(Activity))
