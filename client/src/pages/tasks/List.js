import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Grid, Table } from 'semantic-ui-react'

const List = ({ match }) => {
  const [tasks, setTasks] = useState([])

  const loadTasks = () => {
    axios.get('/api/tasks/').then(response => {
      setTasks(response.data)
    })
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const deleteTask = _id => {
    axios.delete(`/api/tasks/${_id}`).then(() => {
      loadTasks()
    })
  }

  return (
    <>
      <Grid>
        <Grid.Column textAlign='right'>
          <Button floated='right' color='black' as={Link} to={`${match.url}/create`}>
            <i className="fas fa-plus"></i>New Task 
          </Button>
        </Grid.Column>
      </Grid>
      <Table singleLine columns={4} striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Project</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Priority</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tasks.map(task => {
            const { _id, title, project, status, priority, type} = task
            console.log(task);
            const { name } = project
            return (
              <Table.Row key={_id}>
                <Table.Cell>{`${title}`}</Table.Cell>
                <Table.Cell>{`${name}`}</Table.Cell>
                <Table.Cell>{`${status}`}</Table.Cell>
                <Table.Cell>{`${priority}`}</Table.Cell>
                <Table.Cell>{`${type}`}</Table.Cell>
                <Table.Cell textAlign='center'>
                  <Button
                    basic
                    color='blue'
                    as={Link}
                    to={`${match.url}/${_id}`}
                  >
                    Edit
                  </Button>
                  <Button basic color='red' onClick={() => deleteTask(_id)}>
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
