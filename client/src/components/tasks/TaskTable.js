import axios from 'axios'
import React, {Fragment}from 'react'
import { Button, Table } from 'semantic-ui-react'
import ListLoader from '../../components/loader/ListLoader'
import { TypeIcon, PriorityCellColor } from '../../components/tasks/TaskIcons'
import StatusColor from '../status/StatusColor'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'
import uuid from 'uuid'
import {
  TASKS_PATH,
  PROJECTS_PATH,
  TASKS_DETAILS,
  TASKS_HOME
} from '../Constants'

const TaskTable = ({ tasks, setProject, match }) => {
  const deleteTask = _id => {
    axios
      .delete(`${TASKS_PATH}/${_id}`)
      .then(() => {
        axios
          .get(`${PROJECTS_PATH}/${match.params._id}`)
          .then(response => {
            setProject(response.data)
          })
          .catch(error => {
            console.log(error)
          })
      })
      .catch(error => {
        console.log(error)
      })
  }

  if (tasks == null) {
    return <ListLoader />
  } else {
    return (
      <Fragment>
        <SearchBar tasks = {tasks} />
        <Table
          singleLine
          columns={5}
          style={{ border: 'none', borderRadius: '0' }}
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Priority</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {tasks.map(task => {
              const { _id, title, type, status, priority } = task
              const shortTitle = title.substring(0, 25)

              return (
                <Table.Row key={_id}>
                  <Table.Cell>{shortTitle}</Table.Cell>
                  <Table.Cell>
                    <StatusColor key={uuid.v4()} status={status} />
                  </Table.Cell>
                  <Table.Cell>
                    <TypeIcon key={uuid.v4()} type={type} />
                  </Table.Cell>
                  <PriorityCellColor key={uuid.v4()} priority={priority} />
                  <Table.Cell textAlign='center' className='button-actions'>
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
                      color='black'
                      as={Link}
                      to={`${TASKS_HOME}/${_id}`}
                    >
                      <i className='fas fa-pen' />
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
      </Fragment>
    )
  }
}

export default TaskTable
