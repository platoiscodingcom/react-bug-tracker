import React from 'react'
import axios from 'axios'
import {
  CATEGORIES_PATH,
  PROJECTS_PATH,
  PROJECTS_HOME,
  PROJECTS_DETAILS
} from '../Constants'
import { Button, Table } from 'semantic-ui-react'
import moment from 'moment'
import StatusColor from '../status/StatusColor'
import uuid from 'uuid'
import { Link } from 'react-router-dom'

const ProjectTable = ({ projects, setCategory, match }) => {
  const deleteProject = _id => {
    axios
      .delete(`${PROJECTS_PATH}/${_id}`)
      .then(() => {
        axios
          .get(`${CATEGORIES_PATH}/${match.params._id}`)
          .then(response => {
            setCategory(response.data)
          })
          .catch(error => {
            console.log(error)
          })
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Table singleLine columns={4} style={{ border: 'none', borderRadius: '0' }}>
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
              <Table.Cell>{moment(updatedAt).format()}</Table.Cell>
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
                  onClick={() => deleteProject(_id)}
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

export default ProjectTable
