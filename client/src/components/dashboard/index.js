import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Grid, Tab, Container } from 'semantic-ui-react'
import ProjectList from './ProjectList'
import AssignedTasks from './AssignedTasks'
import AssignedProjects from './AssignedProjects'

const Dashboard = () => {
  const panes = [
    {
      menuItem: 'My Projects',
      render: () => (
        <Tab.Pane>
          <ProjectList />
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Assigned Tasks',
      render: () => (
        <Tab.Pane>
          <AssignedTasks />
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Assigned Projects',
      render: () => (
        <Tab.Pane>
          <AssignedProjects />
        </Tab.Pane>
      )
    }
  ]

  return (
    <Container>
      <Tab panes={panes} />
    </Container>
  )
}

Dashboard.propTypes = {}

export default withRouter(connect(null, {})(Dashboard))
