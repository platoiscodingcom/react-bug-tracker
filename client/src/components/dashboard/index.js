import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Doughnut } from 'react-chartjs-2'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Tab, Container, Card, Grid } from 'semantic-ui-react'
import ProjectList from './ProjectList'
import AssignedTasks from './AssignedTasks'
import AssignedProjects from './AssignedProjects'
import { getAssignedTasks, deleteAssignedTask } from '../../actions/taskActions'
import { getAssignedProjects } from '../../actions/projectActions'
import { OPEN, REOPENED, CLOSED, BACKLOG, INPROGRESS } from '../../Constants'

const Dashboard = ({
  auth: { user },
  task: { assignedTasks },
  project: { assignedProjects },
  getAssignedTasks,
  getAssignedProjects,
  deleteAssignedTask
}) => {
  const state = {
    labels: [OPEN, REOPENED, CLOSED, BACKLOG, INPROGRESS],
    datasets: [
      {
        borderWidth:0,
        label: 'Assigned Tasks',
        backgroundColor: [
          '#65b645',
          '#4b5a49',
          '#fffafb',
          '#ad8a64',
          '#987284'
        ],
        data: [65, 59, 80, 81, 56]
      }
    ]
  }

  useEffect(() => {
    if (user) {
      getAssignedTasks(user.assigned_to_tasks)
    }
  }, [user, getAssignedTasks])

  useEffect(() => {
    if (user) getAssignedProjects(user.assigned_to_projects)
  }, [user, getAssignedProjects])

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
          <AssignedTasks assignedTasks={assignedTasks} />
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Assigned Projects',
      render: () => (
        <Tab.Pane>
          <AssignedProjects assignedProjects={assignedProjects} />
        </Tab.Pane>
      )
    }
  ]

  return (
    
    <Container fluid>
    <Grid divided='vertically'>
      <Grid.Row columns={2}>
        <Grid.Column width={10}>
            <Tab panes={panes} />
        </Grid.Column>

        <Grid.Column width={6}>
            <Card>
              <Card.Content>
                <Doughnut
                  data={state}
                  
                  options={{
                    
                    responsive: true,
                    maintainAspectRatio: true,
                    title: {
                      display: true,
                      text: 'Assigned Projects',
                      fontSize: 20
                    },
                    legend: {
                      display: true,
                      position: 'right'
                    },
                    layout: {
                      padding: {
                          left: 10,
                          right: 0,
                          top: 0,
                          bottom: 0
                      }}
                  }}
                />
              </Card.Content>
            </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    </Container>
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
  getAssignedProjects: PropTypes.func.isRequired,
  getAssignedTasks: PropTypes.func.isRequired,
  deleteAssignedTask: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  task: state.task,
  auth: state.auth,
  project: state.project
})

export default withRouter(
  connect(mapStateToProps, {
    getAssignedTasks,
    getAssignedProjects,
    deleteAssignedTask
  })(Dashboard)
)
