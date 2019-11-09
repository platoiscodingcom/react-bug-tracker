import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Grid, Table } from 'semantic-ui-react'

const List = ({ match }) => {
  const [projects, setProject] = useState([]);
  const [taskNo, setTaskNo] = useState();

  const getTasksByProject = ( _id) => {
    axios.get(`/api/tasks/tasksByProject/${_id}`)
    .then(response => {
      console.log('the response');
      console.log(response.data.length);
      //setTaskNo(response.data.length);
      setTaskNo(2);
    })
  }

  const loadProjects = () => {
    axios.get('/api/projects/').then(response => {
      setProject(response.data)
    })
  }
  useEffect(() => {
    loadProjects();
  }, [])

  const deleteProject = _id => {
    axios.delete(`/api/projects/${_id}`).then(() => {
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
            <Table.HeaderCell>#Tasks</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {projects.map((project) => {
            const { _id, name, status, description } = project;
            getTasksByProject(_id);

            //Problem: project ist jew. ein eigenes Object mit eigenen Werten
            //NoOfTasks ist ein einzelner Wert, den ich auf alle Projekte gleichzeitig anwende, aber ich will eine eigene Anzahl für jedes Project
            
            return (
              <Table.Row key={_id}>
                <Table.Cell>{`${name}`}</Table.Cell>
                <Table.Cell>{taskNo}</Table.Cell>
                <Table.Cell>{status}</Table.Cell>
                <Table.Cell>{description}</Table.Cell>
                <Table.Cell textAlign='center'>
                  <Button
                    basic
                    color='blue'
                    as={Link}
                    to={`${match.url}/${_id}`}
                  >
                    Edit
                  </Button>
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
