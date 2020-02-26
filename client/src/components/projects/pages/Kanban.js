import React, { useEffect, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Grid, Header, Menu } from 'semantic-ui-react'
import KanbanColumn from '../KanbanColumn'
import { NavLink } from 'react-router-dom'
import {
  OPEN,
  INPROGRESS,
  CLOSED,
  REOPENED,
} from '../../../Constants'
import { getProject } from './../../../actions/projectActions'

const Kanban = ({ project: { project }, match, history, getProject }) => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    getProject(match.params._id, history)
  }, [getProject, match, history])

  useEffect(() => {
    if (project.tasks) setTasks(project.tasks)
  }, [project.tasks])

  const sortTasks = status => {
    const sortedTasks = tasks.filter(task => task.status === status)
    return <KanbanColumn sortedTasks={sortedTasks} status={status} />
  }

  return (
    <Fragment>
      <Menu secondary>
        <Menu.Item
          name='Details'
          as={NavLink}
          to={'/projects/details/' + match.params._id}
          
        />
        <Menu.Item
          active
          name='Kanban'
          as={NavLink}
          to={'/projects/kanban/' + match.params._id}
        />
      </Menu>
      <Header as='h2'>
      </Header>
      <Grid>
        <Grid.Row columns={4}>
          {sortTasks(OPEN)}
          {sortTasks(REOPENED)}
          {sortTasks(INPROGRESS)}
          {sortTasks(CLOSED)}
        </Grid.Row>
      </Grid>
    </Fragment>
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
