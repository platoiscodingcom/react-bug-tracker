import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Grid, Tab, Container } from 'semantic-ui-react'
import ProjectList from './ProjectList'

const Dashboard = () => {
  const panes = [
    {
      menuItem: 'My Projects',
      render: () => (
        <Tab.Pane attached={false}>
          <ProjectList />
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Assigned Tasks',
      render: () => <Tab.Pane attached={false}>Assigned Tasks</Tab.Pane>
    }
  ]

  return (
    <Container fluid>
      <Grid divided='vertically'>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Tab menu={{ text: true }} panes={panes} />
          </Grid.Column>
          <Grid.Column>updates</Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

Dashboard.propTypes = {}

export default withRouter(connect(null, {})(Dashboard))
