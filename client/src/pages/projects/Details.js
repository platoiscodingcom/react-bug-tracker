import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Card, List, Button, Table} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './projects.css';
import uuid from 'uuid';
import NewTask from '../../components/NewTask';
import DetailsLoader from '../../components/loader/DetailsLoader';
import {StatusColor, TypeIcon} from '../../components/TaskIcons';
import { Redirect } from 'react-router-dom';

const Details = ({match}) =>{
  const [showNewTask, setShowNewTask] = useState({show: false});
  const [project, setProject] = useState({
    _id: '',
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

  const [redirect, setRedirect] = useState(false);
  const deleteProject = _id => {
    axios.delete(`/api/projects/${_id}`).then((res) => {
      if (res.status === 200) {
        setRedirect(true);
      }
    })
  }

  const {_id, name, status, description, categories, tasks} = project;
  const listCat = categories
                    .map((cat) => 
                      <span key={cat._id} className="ui label">
                        <Link to={`/categories/${cat._id}`}>{cat.name}</Link>
                      </span>);

  if(project ==="undefined"|| project._id === ''){
    return <DetailsLoader />
  }else{
    return(
      <div>
        {redirect && (<Redirect to='/projects' push /> )}
          <Container textAlign='left'>
          <Card fluid>
            <Card.Content header={name} />
            <Card.Content>
              <List>
                <List.Item>
                  <div>Status:<StatusColor key={uuid.v4()} status = {status}></StatusColor></div>
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
                color='grey'
                as={Link}
                to={`/projects/${_id}/close`}
              ><i className="fas fa-check"></i>Close</Button>
              <Button 
                floated='right'
                color='red'
                onClick={() => deleteProject(_id)}
              ><i className="fas fa-trash"></i>Delete</Button>
            </Card.Content>
          </Card>
          </Container>

          {showNewTask.show && <NewTask project={project} setShowNewTask={setShowNewTask} showNewTask ={showNewTask} loadProject={loadProject}/>}
          
          <Container style={{ marginTop: "15px"}}  textAlign='left'>
        <Table singleLine columns={4} style={{border: "none", borderRadius: "0"}}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Priority</Table.HeaderCell>
              <Table.HeaderCell>
                <Button color='black' floated='right' onClick={() => setShowNewTask({show: !showNewTask.show})}>
                  <i className="fas fa-plus"></i>New Task 
                </Button>
                </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
          
          {tasks.map(task => {
            const { _id, title, type, status, priority} = task;
            
            return (
              <Table.Row key={_id}>
                <Table.Cell>{`${title}`}</Table.Cell>
                <Table.Cell><StatusColor key={uuid.v4()} status = {status}></StatusColor></Table.Cell>
                <Table.Cell><TypeIcon key={uuid.v4()} type = {type}></TypeIcon></Table.Cell>
                <Table.Cell>{`${priority}`}</Table.Cell>
                <Table.Cell textAlign='center' className="button-actions">
                <Button
                    color='black'
                    as={Link}
                    to={`/tasks/details/${_id}`}
                  >
                  <i className="fas fa-eye"></i>
                  </Button>  
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
      
      </div>
    )}
}

export default Details;