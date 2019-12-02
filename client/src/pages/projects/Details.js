import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Card, List, Button, Grid, Table} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './projects.css';

const Details = ({match}) =>{
  const [project, setProject] = useState({
    name: '',
    status: '',
    description: '',
    categories:[],
    tasks: []
  })

  const loadProject = () => {
    axios.get(`/api/projects/${match.params._id}`).then(response => {
      setProject(response.data)
    });
  }

  useEffect(() => {
    loadProject();
  }, [match])

  const deleteTask = _id => {
    axios.delete(`/api/tasks/${_id}`).then(() => {
      loadProject();
    })
  }

  const {_id, name, status, description, categories, tasks} = project;
  const listCat = categories
                    .map((cat) => 
                      <span key={cat._id} className="ui label">
                        <Link to={`/categories/${cat._id}`}>{cat.name}</Link>
                      </span>);

  return(
    <div>
    <Container textAlign='left'>
    <Card fluid>
      <Card.Content header={name} />
      <Card.Content>
        <List>
          <List.Item>
            <div>Status:<span className="ui label">{status}</span></div>
          </List.Item>
          <List.Item>
            <div>Categories:{listCat}</div> 
          </List.Item>
        </List>
      </Card.Content>
      <Card.Content description= {description} />
      <Card.Content extra>
        <Button
          color='black'
          as={Link}
          to={`/projects/${_id}`}
        ><i className="fas fa-pen"></i>Edit</Button>
        <Button  
          color='green'
          as={Link}
          to={`/projects/${_id}/close`}
        ><i className="fas fa-check"></i>Close</Button>
      </Card.Content>
    </Card>
    </Container>

    <Container textAlign='left'>
      <Grid>
        <Grid.Column textAlign='right'>
          <Button color='black' as={Link} to={`${match.url}/create`}>
          <i className="fas fa-plus"></i>New Task 
          </Button>
        </Grid.Column>
      </Grid>
      <Table singleLine columns={4} striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Priority</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
        
        {tasks.map(task => {
          const { _id, title, type, status, priority} = task
          
          return (
            <Table.Row key={_id}>
              <Table.Cell>{`${title}`}</Table.Cell>
              <Table.Cell>{`${status}`}</Table.Cell>
              <Table.Cell>{`${type}`}</Table.Cell>
              <Table.Cell>{`${priority}`}</Table.Cell>
              <Table.Cell textAlign='center' className="button-actions">
                <Button
                  color='black'
                  as={Link}
                  to={`/tasks/${_id}`}
                >
                <i className="fas fa-pen"></i>
                </Button>
                <Button color='red' onClick={() => deleteTask(_id)}>
                <i className="fas fa-trash"></i>
                </Button>
              </Table.Cell>
            </Table.Row>
          )
        })} 
        </Table.Body>
      </Table>
    </Container>
    
    <Container>
      
    </Container>
    </div>

  )
}

export default Details;