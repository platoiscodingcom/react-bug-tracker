import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {  Link } from 'react-router-dom'
import { getAssignedTasks, deleteTask } from '../../actions/taskActions'
import { Button, Table } from 'semantic-ui-react'
import uuid from 'uuid'
import { TypeIcon, PriorityCellColor } from '../tasks/TaskIcons'
import StatusColor from '../status/StatusColor'
import { TASKS_DETAILS } from '../../Constants'

const AssignedTasks = ({ auth: {user}, task, task: { assignedTasks }, getAssignedTasks }) => {
  useEffect(() => {
      getAssignedTasks(user.assigned_to_tasks)
  }, [user, getAssignedTasks])

  useEffect(() => {
    if(!task.loading) console.log("task", task)
}, [user, getAssignedTasks])


  return (
    <Table singleLine columns={6}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Project</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>Priority</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {assignedTasks.map(task => {
          const { _id, title, project, status, priority, type } = task
          const shortTitle = title.substring(0, 25)
          const { name } = project
          return (
            <Table.Row key={_id}>
              <Table.Cell>{shortTitle}</Table.Cell>
              <Table.Cell>{`${name}`}</Table.Cell>
              <Table.Cell>
                <StatusColor key={uuid.v4()} status={status} />
              </Table.Cell>
              <PriorityCellColor key={uuid.v4()} priority={priority} />
              <Table.Cell>
                <TypeIcon key={uuid.v4()} type={type} />
              </Table.Cell>
              <Table.Cell textAlign='right' className='button-actions'>
                <Button
                  circular
                  compact
                  size='mini'
                  color='black'
                  as={Link}
                  to={`${TASKS_DETAILS}/${_id}`}
                >
                  <i className='fas fa-eye' />
                </Button>
                <Button
                  circular
                  compact
                  size='mini'
                  color='red'
                  onClick={() => deleteTask(_id)}
                >
                  <i className='fas fa-trash' />
                </Button>
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}

AssignedTasks.propTypes = {
  task: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getAssignedTasks: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  task: state.task,
  auth: state.auth
})

export default (
  connect(mapStateToProps, { getAssignedTasks })(AssignedTasks)
)
