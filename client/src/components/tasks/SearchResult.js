import React from 'react'
import { Link } from 'react-router-dom'
import uuid from 'uuid'
import StatusColor from './../status/StatusColor'
import { TypeIcon, PriorityCellColor } from './TaskIcons'
import { TASKS_DETAILS, TASKS_HOME, PROJECTS_DETAILS } from './../Constants'
import { Button, Table } from 'semantic-ui-react'
import { deleteTask } from './../../actions/taskActions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

const SearchResult = ({cleanResult, result, deleteTask, match, history}) => {
  const removeTask = id => {
    deleteTask(id)
    history.push(PROJECTS_DETAILS + '/' + match.params._id)
    cleanResult()
  }
  const recordArray = [result]
  return (
    <Table singleLine columns={5} style = {{width: '98%'}}>
    <Table.Body>
      {recordArray.map(rec => {
        const { id, value, type, status, priority } = rec
        const shortTitle = value.substring(0, 25)

        return (
          <Table.Row key={id}>
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
                to={`${TASKS_DETAILS}/${id}`}
              >
                <i className='fas fa-eye' />
              </Button>
              <Button
                circular
                compact
                size='mini'
                color='black'
                as={Link}
                to={`${TASKS_HOME}/${id}`}
              >
                <i className='fas fa-pen' />
              </Button>
              <Button
                circular
                compact
                size='mini'
                color='red'
                onClick={() => removeTask(id)}
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

SearchResult.propTypes = {
  deleteTask: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
})

export default withRouter(connect(mapStateToProps, {deleteTask})(SearchResult))