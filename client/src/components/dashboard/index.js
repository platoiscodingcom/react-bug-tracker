import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Tab, Container } from 'semantic-ui-react'
import ProjectList from './ProjectList'
import AssignedTasks from './AssignedTasks'
import AssignedProjects from './AssignedProjects'
import { getAssignedTasks, deleteTask } from '../../actions/taskActions'
import { getAssignedProjects } from '../../actions/projectActions'

const Dashboard = ({
  auth: { user },
  task: { assignedTasks },
  project: {assignedProjects},
  getAssignedTasks,
  getAssignedProjects
}) => {
  useEffect(() => {
    if(user) {
      console.log("user.assigned_to_tasks", user.assigned_to_tasks)
      getAssignedTasks(user.assigned_to_tasks)
    }
  }, [user, getAssignedTasks, deleteTask])

  useEffect(() => {
    if(user) getAssignedProjects(user.assigned_to_projects)
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
          <AssignedTasks assignedTasks={assignedTasks}/>
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Assigned Projects',
      render: () => (
        <Tab.Pane>
          <AssignedProjects assignedProjects ={assignedProjects}/>
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

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
  getAssignedProjects: PropTypes.func.isRequired,
  getAssignedTasks: PropTypes.func.isRequired,
  deleteTask:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  task: state.task,
  auth: state.auth,
  project: state.project,
})

export default withRouter(
  connect(mapStateToProps, { getAssignedTasks, getAssignedProjects, deleteTask })(Dashboard)
)
