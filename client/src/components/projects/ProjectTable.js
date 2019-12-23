import React, { useEffect, useState } from 'react'
import { PROJECTS_HOME, PROJECTS_DETAILS } from '../Constants'
import { Button, Table } from 'semantic-ui-react'
import moment from 'moment'
import StatusColor from '../status/StatusColor'
import uuid from 'uuid'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteProject } from '../../actions/projectActions'
import { getCategory } from '../../actions/categoryActions'

const ProjectTable = ({
  category: { category },
  deleteProject,
  getCategory,
  history
}) => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    if (category.projects) setProjects(category.projects)
  }, [category.projects, deleteProject])

  const removeProject = id => {
    deleteProject(id)
    getCategory(category._id, history)
  }

  return (
    <Table singleLine columns={4}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>Updated At</Table.HeaderCell>
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {projects.map(project => {
          const { _id, name, status, updatedAt } = project

          return (
            <Table.Row key={_id}>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>
                <StatusColor key={uuid.v4()} status={status} />
              </Table.Cell>
              <Table.Cell>{moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</Table.Cell>
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
                <Button
                  circular
                  compact
                  size='mini'
                  color='red'
                  onClick={() => removeProject(_id)}
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

ProjectTable.propTypes = {
  deleteProject: PropTypes.func.isRequired,
  getCategory: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  category: state.category
})

export default connect(mapStateToProps, { deleteProject, getCategory })(
  ProjectTable
)
