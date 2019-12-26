import React, { useEffect, useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Grid, Header } from 'semantic-ui-react'
import KanbanColumn from './KanbanComponents/KanbanColumn'
import {
  OPEN,
  INPROGRESS,
  CLOSED,
  BACKLOG,
  REOPENED
} from '../../components/Constants'
import { getProject } from './../../actions/projectActions'

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
    <Header as='h2'>{project.name}</Header>
    <Grid style={{ width: '150%' }}>
      <Grid.Row columns={5}>
        {sortTasks(OPEN)}
        {sortTasks(REOPENED)}
        {sortTasks(INPROGRESS)}
        {sortTasks(CLOSED)}
        {sortTasks(BACKLOG)}
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
