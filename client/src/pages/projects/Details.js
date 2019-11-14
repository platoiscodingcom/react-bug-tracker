import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Card, Icon, List, Button, Grid, Table} from 'semantic-ui-react';
import { Link } from 'react-router-dom'

const Details = ({match}) =>{
  const [project, setProject] = useState({
    name: '',
    status: '',
    description: '',
    categories:[],
    tasks: []
  })
  useEffect(() => {
    axios.get(`/api/projects/${match.params._id}`).then(response => {
      setProject(response.data)
    });
    
  }, [match])

  const deleteTask = _id => {
    axios.delete(`/api/tasks/${_id}`).then(() => {})
  }

  const {_id, name, status, description, categories, tasks} = project;
  const listCat = categories.map((cat) => <li>{cat.name}</li>);
  console.log(project);
  console.log(tasks);

  return(
    <div>
    
    <Container textAlign='left'>
    <Card fluid>
      <Card.Content header={name} />
      <Card.Content>
        <List>
          <List.Item>
            <div className="ui label">Status:</div><div>{status}</div>
          </List.Item>
          <List.Item>
            <div className="ui label">Categories:</div>
            <ul>
                {listCat} </ul>
          </List.Item>
        </List>
      </Card.Content>
      <Card.Content description= {description} />
      <Card.Content extra>
        <Icon name='user' />noOfTusks 
        <Button
        basic
        color='blue'
        as={Link}
        to={`/projects/${_id}`}
      >
        Edit
      </Button>
      </Card.Content>
    </Card>
    </Container>

    <Container textAlign='left'>
    <Grid>
        <Grid.Column width={8} textAlign='right'>
          <Button color='green' as={Link} to={'/'}>
            New
          </Button>
        </Grid.Column>
      </Grid>
      <Table singleLine columns={4} striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Priority</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
        
        {tasks.map(task => {
          const { _id, title, status, priority} = task
          
          return (
            <Table.Row key={_id}>
              <Table.Cell>{`${title}`}</Table.Cell>
              <Table.Cell>{`${status}`}</Table.Cell>
              <Table.Cell>{`${priority}`}</Table.Cell>
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
    </Container>
    
    </div>

  )
}

export default Details;