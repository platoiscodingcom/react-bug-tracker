import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { getAssignedProjects } from '../../actions/projectActions'
import { Button, Table } from 'semantic-ui-react'
import uuid from 'uuid'
import StatusColor from '../status/StatusColor'
import { PROJECTS_DETAILS, PROJECTS_HOME } from '../../Constants'

const AssignedProjects = ({ auth:{user}, project: { projects }, getAssignedProjects }) => {
  useEffect(() => {
    if(user) getAssignedProjects(user.assigned_to_projects)
  }, [])

  return (
    <Table singleLine columns={5}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>Author</Table.HeaderCell>
          <Table.HeaderCell>Assigned To</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {projects.map(project => {
          const { _id, name, status, author, assignedTo } = project
          const shortName = name.substring(0, 25)

          return (
            <Table.Row key={_id}>
              <Table.Cell>{shortName}</Table.Cell>
              <Table.Cell>
                <StatusColor key={uuid.v4()} status={status} />
              </Table.Cell>
              <Table.Cell>{author.name}</Table.Cell>
              <Table.Cell>{assignedTo.name}</Table.Cell>
              <Table.Cell textAlign='center' className='button-actions'>
                <Button
                  circular
                  compact
                  size='mini'
                  color='black'
                  as={Link}
                  to={`${PROJECTS_DETAILS}/${_id}`}
                >
                  <i className='fas fa-eye' />
                </Button>
                <Button
                  circular
                  compact
                  size='mini'
                  color='black'
                  as={Link}
                  to={`${PROJECTS_HOME}/${_id}`}
                >
                  <i className='fas fa-pen' />
                </Button>
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}

AssignedProjects.propTypes = {
  project: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getAssignedProjects: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  project: state.project,
  auth: state.auth
})

export default withRouter(
  connect(mapStateToProps, { getAssignedProjects })(AssignedProjects)
)
