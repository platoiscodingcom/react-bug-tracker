import React, { useEffect, useState } from 'react'
import { Tab } from 'semantic-ui-react'
import { OPEN, INPROGRESS, CLOSED, BACKLOG, REOPENED } from '../Constants'
import TaskTable from './TaskTable'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';

const TableTabs = ({project:{project}}) => {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    if (project.tasks) setTasks(project.tasks)
  }, [project.tasks])

  const sortTasks = status => {
    const sortedTasks = tasks.filter(task => task.status === status)
    return <TaskTable sortedTasks={sortedTasks} />
  }

  const panes = [
    { menuItem: 'OPEN', render: () => <Tab.Pane>{sortTasks(OPEN)}</Tab.Pane> },
    { menuItem: 'REOPENED', render: () => <Tab.Pane>{sortTasks(REOPENED)}</Tab.Pane> },
    { menuItem: 'INPROGRESS', render: () => <Tab.Pane>{sortTasks(INPROGRESS)}</Tab.Pane> },
    { menuItem: 'CLOSED', render: () => <Tab.Pane>{sortTasks(CLOSED)}</Tab.Pane> },
    { menuItem: 'BACKLOG', render: () => <Tab.Pane>{sortTasks(BACKLOG)}</Tab.Pane> },
  ]

  return (
    <Tab panes={panes} />
  )
}

TableTabs.propTypes = {
  project: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  project: state.project
})


export default withRouter(connect(mapStateToProps, {})(TableTabs))
