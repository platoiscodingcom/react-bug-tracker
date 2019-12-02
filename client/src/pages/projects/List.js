import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Grid, Table } from 'semantic-ui-react'

const List = ({ match }) => {
  const [projects, setProject] = useState([]);

  const loadProjects = () =>{
    axios.get('/api/projects/')
      .then(res => {
        setProject(res.data);
      })
  }

  useEffect(() => {
    loadProjects();
  }, [match])

  const deleteProject = _id => {
    axios.delete(`/api/projects/${_id}`)
      .then(() => {
        loadProjects()
    })
  }
  return (
    <>
      <Grid>
        <Grid.Column width={8} textAlign='left'>
          <Header as='h2'>List</Header>
        </Grid.Column>
        <Grid.Column width={8} textAlign='right'>
          <Button color='green' as={Link} to={`${match.url}/create`}>
            New
          </Button>
        </Grid.Column>
      </Grid>
      <Table singleLine columns={4} striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {projects.map(project => {
            const { _id, name, status} = project
            return (
              <Table.Row key={_id}>
                <Table.Cell>{`${name}`}</Table.Cell>
                <Table.Cell>{`${status}`}</Table.Cell>
                <Table.Cell textAlign='center'>
                  <Button
                    basic
                    color='blue'
                    as={Link}
                    to={`${match.url}/${_id}`}
                  >
                    Edit
                  </Button>
                  <Button
                    basic
                    color='green'
                    as={Link}
                    to={`projects/details/${_id}`}
                  >Details</Button>
                  <Button basic color='red' onClick={() => deleteProject(_id)}>
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </>
  )
}

export default List;
